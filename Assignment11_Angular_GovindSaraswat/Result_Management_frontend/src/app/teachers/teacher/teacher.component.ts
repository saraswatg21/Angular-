import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service'; 
import { Router } from '@angular/router';
@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {
  showmenu = false;

  constructor(private service: ApiserviceService, private router:Router){}
  token = this.service.getToken();
  name = localStorage.getItem('username');

  ngOnInit(): void {
    if(this.token) {
      this.showmenu = true;
    } else {
      this.showmenu = false;
    }
  }

  // logout
  logout() {
    localStorage.clear();
    this.router.navigate(['teacher/login']).then(()=>{
      window.location.reload();
    });
  }

    // back
    back() {
      this.router.navigate(['/']).then(() => {
        window.location.reload();
      });
    }

}
