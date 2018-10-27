import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from '@angular/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor(private http: HttpClient) { }

  getAllTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>('/api/todos')
      .pipe(catchError(this.handleError));
  }

  getOneTodo(id: string): Observable<Todo> {
    return this.http.get<Todo>('/api/todos/' + id)
      .pipe(catchError(this.handleError));
  }

  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>('/api/todos', todo)
      .pipe(catchError(this.handleError));
  }

  updateOneTodo(todo: Todo): Observable<Todo> {
    return this.http.patch<Todo>('/api/todos/' + todo._id, todo)
      .pipe(catchError(this.handleError));
  }

  deleteAllTodos(): Observable<number> {
    return this.http.delete<number>('/api/todos')
      .pipe(catchError(this.handleError));
  }

  deleteOneTodo(id: string): Observable<number> {
    return this.http.delete<number>('/api/todos/' + id)
      .pipe(catchError(this.handleError));
  }

  handleError(error: any): Observable<any> {
    if (error.status) {
      return of(error.status);
    }
    return Observable.throw(error.message || error);
  }
}
