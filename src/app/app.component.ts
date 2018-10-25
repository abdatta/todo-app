import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  all = false;
  filter: ('all' | 'active' | 'completed') = 'all';
  edit = -1;

  items = [
    {
      name: 'Item 1',
      completed: false
    },
    {
      name: 'Item 2',
      completed: false
    },
    {
      name: 'Item 4',
      completed: false
    },
    {
      name: 'Item 3',
      completed: false
    }
  ];

  constructor() {}

  getItems() {
    return this.items.filter(item => this.filter === 'all' || item.completed === (this.filter === 'completed'));
  }

  getItemsLeft() {
    return this.items.filter(item => !item.completed);
  }

  addItem(name: string) {
    this.items.push({
      name: name,
      completed: false
    });
    this.all = false;
  }

  delItem(i: number) {
    this.items.splice(i, 1);
  }

  toggleAll() {
    this.all = !this.all;
    this.items.forEach(item => item.completed = this.all);
  }

  drop(event: any) {
    this.items.splice(event.currentIndex, 0, ...this.items.splice(event.previousIndex, 1));
  }
}
