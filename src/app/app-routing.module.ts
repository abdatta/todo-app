import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// App Components
import { TodosComponent } from './todos-component/todos.component';
import { AuthComponent } from './auth-component/auth.component';
import { StatsComponent } from './stats-component/stats.component';

import { AuthGuard, UnAuthGuard, AdminGuard } from './auth-guard/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: TodosComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'authenticate',
        component: AuthComponent,
        canActivate: [UnAuthGuard]
    },
    {
        path: 'stats',
        component: StatsComponent,
        canActivate: [AdminGuard]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
