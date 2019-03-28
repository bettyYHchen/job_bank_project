import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Job } from '../pojo/job';
import { delay } from 'q';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient) { }

  getJobs() {
    return this.http.get('/server/api/v2/jobs');
  }

  getJob(id: number) {
    return this.http.get<Job>('/server/api/v2/jobs/' + id,
      httpOptions);
    delay(2000);
  }

  postJob(job) {
    let body = JSON.stringify(job);
    return this.http.post('/server/api/v2/jobs', body, httpOptions);
  }

  updateJob(id: number, job: Job) {
    let body = JSON.stringify(job);
    return this.http.put('/server/api/v2/jobs/' + id, body, httpOptions);
  }

  deleteJob(id: number) {
    return this.http.delete('/server/api/v2/jobs/' + id);
  }


}
