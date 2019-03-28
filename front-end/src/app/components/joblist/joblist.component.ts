import { Component, OnInit } from '@angular/core';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-joblist',
  templateUrl: './joblist.component.html',
  styleUrls: ['./joblist.component.css']
})
export class JoblistComponent implements OnInit {
  public jobs;

  constructor(private jobService: JobService) { }

  ngOnInit() {
    this.getJobs();
  }

  getJobs() {
    this.jobService.getJobs().subscribe(
      data => this.jobs = data,
      err => console.log(err),
      () => console.log('all job posts loaded!')
    );
  }

}
