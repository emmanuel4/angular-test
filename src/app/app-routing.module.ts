import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './componets/users/users.component';
import { ListComponent } from './componets/list/list.component';
import { FormComponent } from './componets/form/form.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full'
  },
  {
    path: 'users',
    component: UsersComponent,
    children: [
      {
        path: '',
        component: ListComponent
      },
      {
        path: 'add-user',
        component: FormComponent
      },
      {
        path: 'edit-user/:id',
        component: FormComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
