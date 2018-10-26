import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Todo } from '../todo-model/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor(private http: HttpClient) { }

  getAllTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>('/api/todos');
  }

  getOneTodo(id: string): Observable<Todo> {
    return this.http.get<Todo>('/api/todos/' + id);
  }

  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>('/api/todos', todo);
  }

  updateOneTodo(todo: Todo): Observable<Todo> {
    return this.http.patch<Todo>('/api/todos/' + todo._id, todo);
  }

  deleteAllTodos(): Observable<number> {
    return this.http.delete<number>('/api/todos');
  }

  deleteOneTodo(id: string): Observable<number> {
    return this.http.delete<number>('/api/todos/' + id);
  }
}
