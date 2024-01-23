import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './teachers/signup/signup.component';
import { LoginComponent } from './teachers/login/login.component';
import { StudentRecordsComponent } from './teachers/student-records/student-records.component';
import { TeacherComponent } from './teachers/teacher/teacher.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TeachersModule } from './teachers/teachers.module';
import { StudentModule } from './student/student.module';
import { TokeninterceptorInterceptor } from './teachers/tokeninterceptor.interceptor';
import { ApiserviceService } from './teachers/apiservice.service';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    StudentRecordsComponent,
    TeacherComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TeachersModule,
    StudentModule
  ],
  providers: [
    ApiserviceService,
    {
      provide : HTTP_INTERCEPTORS,
      useClass : TokeninterceptorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
