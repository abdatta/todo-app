import { Component, OnInit } from '@angular/core';
import { TodosService } from './todos.service';
import { Todo } from './todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  all = false;
  filter: ('all' | 'active' | 'completed') = 'all';
  edit = -1;

  items: Todo[] = [];

  constructor(private todosService: TodosService) {}

  ngOnInit() {
    this.todosService.getAllTodos()
      .subscribe(todos => this.items = todos.sort((a, b) => a.order - b.order));
  }

  getItems() {
    return this.items.filter((item, i) => {
      item['i'] = i;
      return this.filter === 'all' || item.completed === (this.filter === 'completed');
    });
  }

  getItemsLeft() {
    return this.items.filter(item => !item.completed);
  }

  getItemsComplete() {
    return this.items.filter(item => item.completed);
  }

  addItem(title: string) {
    const newTodo: Todo = {
      title: title,
      completed: false,
      order: this.items.length > 0 ? (this.items[this.items.length - 1].order + 64) : 0
    };
    this.items.push(newTodo);
    this.all = false;
    this.todosService.addTodo(newTodo)
      .subscribe(todo => newTodo._id = todo._id);
  }

  deleteCompleted() {
    const comp = this.items.filter(item => item.completed);
    this.items = this.getItemsLeft();
    comp.forEach(item => this.todosService.deleteOneTodo(item._id)
        .subscribe(c => null, error => null));
  }

  delItem(i: number) {
    this.todosService.deleteOneTodo(this.items[i]._id)
      .subscribe(c => null, error => null);
    this.items.splice(i, 1);
  }

  toggleItem(i: number) {
    this.all = false;
    this.items[i].completed = !this.items[i].completed;
    this.updateItem(this.items[i]);
  }

  toggleAll() {
    this.all = !this.all;
    this.items.forEach(item => {
      if (item.completed !== this.all) {
        item.completed = this.all;
        this.updateItem(item);
      }
    });
  }

  reTitle(i: number) {
    this.edit = -1;
    this.updateItem(this.items[i]);
  }

  drop(event: any) {
    if (event.previousIndex !== event.currentIndex) {
      const items = this.getItems();
      const pi = items[event.previousIndex]['i'];
      const ci = items[event.currentIndex]['i'];
      if (pi < ci) {
        if (ci < this.items.length - 1) {
          this.items[pi].order = (this.items[ci].order + this.items[ci + 1].order) / 2;
        } else {
          this.items[pi].order = this.items[ci].order + 64;
        }
      } else {
        if (ci > 0) {
          this.items[pi].order = (this.items[ci].order + this.items[ci - 1].order) / 2;
        } else {
          this.items[pi].order = this.items[ci].order - 64;
        }
      }
      this.updateItem(this.items[pi]);
      this.items.sort((a, b) => a.order - b.order);
    }
  }

  updateItem(item: Todo) {
    this.todosService.updateOneTodo(item)
      .subscribe(todo => item._id = todo._id);
  }
}
