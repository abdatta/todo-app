import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';

import { TodosService } from './todos-service/todos.service';
import { AuthService } from './auth-service/auth.service';

import { AppComponent } from './app-component/app.component';
import { AuthComponent } from './auth-component/auth.component';
import { TodosComponent } from './todos-component/todos.component';
import { StatsComponent } from './stats-component/stats.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    TodosComponent,
    StatsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    DragDropModule,
    MaterialModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    TodosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
