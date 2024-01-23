import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { StudentRecordsComponent } from './student-records/student-records.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  {path:'teacher', children:[
    {path:'signup', component:SignupComponent},
    {path:'login', component:LoginComponent},
    {path:'record', component:StudentRecordsComponent},
    {path:'record/add', component:AddComponent},
    {path:'record/add/:id', component:UpdateComponent}
  ]}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeachersRoutingModule { }
