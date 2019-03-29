import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Job } from '../pojo/job';
import { delay } from 'q';
import { JobPostUser } from '../pojo/job-post-user';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'withCredentials': 'true'})
};

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private _fackLoginFlag = false;
  public get fackLoginFlag() {
    return this._fackLoginFlag;
  }
  public set fackLoginFlag(value) {
    this._fackLoginFlag = value;
  }

  constructor(private http: HttpClient) { }

  getJobs() {
    return this.http.get('/server/api/v2/jobs',{withCredentials: true});
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
    return this.http.delete('/server/api/v2/jobs/' + id, {withCredentials: true});
  }

  login(jobPostUser: JobPostUser) {
    return this.http.post<JobPostUser>('/server/api/v2/jobs/' + 'login', jobPostUser, {withCredentials: true});
  }

  checkLogin(): Observable<any> {
    return this.http.get('/server/api/v2/jobs/' + '/checklogin', {withCredentials: true}).pipe(map((response: Response) => {
      console.log(response);
      return response;
    }, catchError(error => {
      return Observable.throw(error);
    }))
  );
  }


}
