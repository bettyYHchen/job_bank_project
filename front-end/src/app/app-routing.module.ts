import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JoblistComponent } from './components/joblist/joblist.component';
import { HomeComponent } from './components/home/home.component';
import { JobDetailsComponent } from './components/job-details/job-details.component';
import { EditJobpostComponent } from './components/edit-jobpost/edit-jobpost.component';
import { JobUserLoginComponent } from './components/job-user-login/job-user-login.component';
import { LoggedInGuardService } from './services/logged-in-guard.service';
import { StartPageComponent } from './components/start-page/start-page.component';



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
    component: StartPageComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
