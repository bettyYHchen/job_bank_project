import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JoblistComponent } from './components/joblist/joblist.component';
import { HomeComponent } from './components/home/home.component';
import { JobDetailsComponent } from './components/job-details/job-details.component';
import { EditJobpostComponent } from './components/edit-jobpost/edit-jobpost.component';
import { JobUserLoginComponent } from './components/job-user-login/job-user-login.component';
import { LoggedInGuardService } from './services/logged-in-guard.service';



const routes: Routes = [
  {
    path: 'joblist/view/:id',
    component: EditJobpostComponent,
    canActivate: [LoggedInGuardService]
  },
  {
    path: 'joblist',
    component: JoblistComponent,
  },
  {
    path: 'jobpost',
    component: HomeComponent,
    canActivate: [LoggedInGuardService]
  },
  {
    path: 'login',
    component: JobUserLoginComponent
  },
  {
    path: '',
    component: JoblistComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
