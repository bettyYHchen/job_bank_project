import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-job-user-login',
  templateUrl: './job-user-login.component.html',
  styleUrls: ['./job-user-login.component.css']
})
export class JobUserLoginComponent implements OnInit {
  jobUserLoginForm: FormGroup;
  devjson: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private dService: JobService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.jobUserLoginForm = this.fb.group({
      userName: '',
      password: ''
    });
  }

  onSubmit(f) {
    this.dService.fackLoginFlag = true;
    console.log("fackLoginFlag = " + this.dService.fackLoginFlag);

    if (f.valid) {
      console.log('This form is good to go.');
    }
    console.log(f.value);
    this.devjson = f.value;
    this.dService.login(f.value)
      .subscribe(data => {
        console.log(data);
        // after login, move the page to create job
        this.router.navigate(['/jobpost']);
      }, err => {
        console.log('Something went wrong!');
      });

  }

  logout() {
    this.dService.fackLoginFlag = false;
    console.log("fackLoginFlag = " + this.dService.fackLoginFlag);
  }



}
