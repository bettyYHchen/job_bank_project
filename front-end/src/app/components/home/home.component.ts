import { Component, OnInit } from '@angular/core';
import { JobService } from 'src/app/services/job.service';
import { FormGroup, FormControl, Validator, Validators, FormBuilder } from '@angular/forms';
import { Observable, from } from 'rxjs';
import { JobType } from 'src/app/pojo/job-type';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  jobTypeList: JobType[] = [
    new JobType(1, 'Full-time'), new JobType(2, 'Contractor'),
    new JobType(3, 'Part-time'), new JobType(4, 'Seasonal'), new JobType(5, 'Temporary')
  ];
  postForm: FormGroup;
  validMessage = '';
  constructor(
    private jobService: JobService,
    private fb: FormBuilder
    ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.postForm = this.fb.group({
      jobCompany: this.fb.group({
        companyName: [''],
        contactor: [''],
        email: ['', Validators.email],
        phone: ['']
      }),
      jobTitle: [''],
      jobType: this.fb.group({
        id: [0],
        jobTypeName: ['']
      }),
      jobDescription: '',
      requirement: '',
      location: '',
      salary: '',
    });
  }

  onSubmit() {
    if (this.postForm.valid) {
      this.validMessage = 'Your job has been posted. Thank you!';
      this.jobService.postJob(this.postForm.value).subscribe(
        data => {
          this.postForm.reset();
          return true;
        },
        error => {
          return Observable.throw(error);
        }
      );
    } else {
      this.validMessage = 'Please fill out the post form before submitting!';
    }
  }



}
