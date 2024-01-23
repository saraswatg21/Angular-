import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiserviceService } from 'src/app/teachers/apiservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private service: ApiserviceService, private router: Router) { }
  errmsg: any;
  errmsgshow = false;
  studdata: any
  public static studresult: any

  loginForm = new FormGroup({
    rollno: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
  });

  ngOnInit(): void { }

  loginSubmit() {
    if (this.loginForm.valid) {
      this.errmsgshow = false;
      this.studdata = this.loginForm.value;

      //call fetch single student record api
      this.service.getSingleData(this.studdata.rollno).subscribe((res) => {
        if (res.status == true) {
          LoginComponent.studresult = res.data;
          console.log(LoginComponent.studresult);
          this.router.navigate(['student/result']);
        } else {
          this.errmsgshow = true;
          this.errmsg = res.message;
        }
      });
    } else {
      this.errmsgshow = true;
      this.errmsg = 'All fields are required !!';
    }
  }

  // back
  back() {
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }

}
