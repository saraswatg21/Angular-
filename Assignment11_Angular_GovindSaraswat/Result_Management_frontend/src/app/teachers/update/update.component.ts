import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  constructor(private service: ApiserviceService, private router: ActivatedRoute, private route: Router) { }

  errmsgshow=false;
  succmsgshow=false;
  errormsg:any;
  successmsg:any;
  getParamId:any;

  ngOnInit(): void {
    this.getParamId = this.router.snapshot.paramMap.get('id');
    if(this.getParamId)
    {
      this.service.getSingleData(this.getParamId).subscribe((res)=>{
        console.log(res);
        this.userForm.patchValue({
          rollno:res.data[0].rollno,
          name:res.data[0].name,
          dob:res.data[0].dob,
          score:res.data[0].score
        });
      });
    }
  }

  userForm = new FormGroup({
    'rollno': new FormControl('', Validators.required),
    'name' : new FormControl('', Validators.required),
    'dob' : new FormControl('', Validators.required),
    'score' : new FormControl('', Validators.required),
  });

    //update user
    userUpdate()
    {
      console.log(this.userForm.value,'updatedForm');
  
      if(this.userForm.valid)
      {
        this.service.updateData(this.userForm.value, this.getParamId).subscribe((res)=>{
          console.log(res);
          this.successmsg = res.message;
        });
      }
      else{
        this.errormsg = 'all field is required';
      }
    }

}
