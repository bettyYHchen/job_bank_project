import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/pojo/job';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { JobService } from 'src/app/services/job.service';
import { JobType } from 'src/app/pojo/job-type';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-edit-jobpost',
  templateUrl: './edit-jobpost.component.html',
  styleUrls: ['./edit-jobpost.component.css']
})
export class EditJobpostComponent implements OnInit {
  jobTypeList: JobType[] = [
    new JobType(1, 'Full-time'), new JobType(2, 'Contractor'),
    new JobType(3, 'Part-time'), new JobType(4, 'Seasonal'), new JobType(5, 'Temporary')
  ];
  editForm: FormGroup;
  validMessage = '';
  jobExample: Job;
  private sub: Subscription;
  message: string;
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private jobService: JobService) { }

  ngOnInit() {
    this.updateForm();
    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        this.getJob(id);
      }
    );
  }

  getJob(id: number): void {
    this.jobService.getJob(id)
    .subscribe(
      (data: Job) => this.displayForm(data),
      (error: any) => console.error(error)
    );
  }

  updateForm() {
    this.editForm = this.fb.group({
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
      jobDescription: [''],
      requirement: [''],
      location: [''],
      salary: [''],
    });
  }

  displayForm(data: Job): void {
    if (this.editForm) {
      this.editForm.reset();
    }
    this.jobExample = data;
    this.editForm.patchValue({
      jobCompany: {
        companyName: this.jobExample.jobCompany.companyName,
        contactor: this.jobExample.jobCompany.contactor,
        email: this.jobExample.jobCompany.email,
        phone: this.jobExample.jobCompany.phone
      },
      jobTitle: this.jobExample.jobTitle,
      jobType: {
        id: this.jobExample.jobType.id,
        jobTypeName: this.jobExample.jobType.jobTypeName
      },
      jobDescription: this.jobExample.jobDescription,
      requirement: this.jobExample.requirement,
      location: this.jobExample.location,
      salary: this.jobExample.salary
    });

  }


  onUpdate() {
    if (this.editForm.valid) {
      this.validMessage = 'Your job information has been updated!';
      this.jobService.updateJob(this.route.snapshot.params.id, this.editForm.value).subscribe(
        data => {
          this.message = 'The job post has been updated!';
          return true;
        },
        error => Observable.throw(error));
    } else {
      this.validMessage = 'Please make sure the inputs are valid!';
    }
  }

onDelete() {
  if (confirm('Are you sure you want to delete this job?')) {
    this.jobService.deleteJob(this.route.snapshot.params.id)
    .subscribe(
      () => this.editForm.reset(),
      (error: any) => console.error(error)
    );
  }
}

}
