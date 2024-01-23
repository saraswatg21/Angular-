import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-records',
  templateUrl: './student-records.component.html',
  styleUrls: ['./student-records.component.css']
})
export class StudentRecordsComponent implements OnInit {

  constructor(private service: ApiserviceService, private router: Router) { }
  errmsg: any;
  errmsgshow = false;
  data: any;

  ngOnInit(): void {
    this.getAllData();
  }

  // logout
  logout() {
    localStorage.clear();
    this.router.navigate(['teacher/login']).then(() => {
      window.location.reload();
    });
  }

  //getdeletedid

  deleteID(id: any) {

    console.log(id, 'deleted');

    this.getAllData();

    this.service.deleteData(id).subscribe((res) => {

      this.getAllData();

      window.location.reload();

      console.log(res.message);



    });
  }

  //get all data
  getAllData() {
    this.service.record().subscribe((res) => {
      if (res.status == false) {
        this.errmsgshow = true;
        this.errmsg = 'Access denied!';
      }
      else {
        this.data = res.data;
      }
    })
  }
}
