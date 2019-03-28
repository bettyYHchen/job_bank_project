import { Component, OnInit } from '@angular/core';
import { JobService } from 'src/app/services/job.service';
import { ActivatedRoute } from '@angular/router';
import { Job } from 'src/app/pojo/job';
import { JobType } from 'src/app/pojo/job-type';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {
  jobTypeList: JobType[] = [
    new JobType(1, 'Full-time'), new JobType(2, 'Contractor'),
    new JobType(3, 'Part-time'), new JobType(4, 'Seasonal'), new JobType(5, 'Temporary')
  ];
  public jobDetail;
  constructor(private jobService: JobService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getjobDetail(this.route.snapshot.params.id);
  }

  getjobDetail(id: number) {
    this.jobService.getJob(id).subscribe(
      data => {this.jobDetail = data; console.log(this.jobDetail); },
      err => console.log(err),
      () => console.log('job details loaded')
    );
  }

}
