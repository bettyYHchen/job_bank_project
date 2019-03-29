import { Injectable } from '@angular/core';
import { JobService } from './job.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuardService {

  constructor(private auth: JobService, private router: Router, private http: HttpClient) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log(this.auth.fackLoginFlag);
    // ======== server version:
    return this.auth.checkLogin()
      .pipe(map(loginStatus => {
          // console.log(loginStatus);

          if (!loginStatus.login) {
            this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
          }
          return loginStatus.login;
        }, catchError(error => {
          this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
          return of(false);
        }))
      );
  }
}


