import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor(private service: ApiserviceService, private router: ActivatedRoute, private route: Router) { }

  errmsgshow=false;
  succmsgshow=false;
  errormsg:any;
  successmsg:any;
  getParamId:any;

  ngOnInit(): void { }

  userForm = new FormGroup({
    'rollno': new FormControl('', Validators.required),
    'name' : new FormControl('', Validators.required),
    'dob' : new FormControl('', Validators.required),
    'score' : new FormControl('', Validators.required),
  });

    //create new user
    userSubmit()
    {
      if(this.userForm.valid)
      {
        this.service.createData(this.userForm.value).subscribe((res)=>{
          console.log(res);
          this.userForm.reset();
          this.successmsg=true;
          this.errmsgshow = false;
          this.successmsg='Successfully Added !';
        })
      }
      else
      { 
        this.errmsgshow = true;
        this.successmsg=false; 
        this.errormsg = 'All fields are required !';
      }
    }
}
