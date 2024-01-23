import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  constructor(private router:Router) { }
  result : any;

  ngOnInit(): void {
    this.result=LoginComponent.studresult;
  }

  // logout
  logout() {
    this.router.navigate(['student/login']).then(() => {
      window.location.reload();
    });
  }

}
