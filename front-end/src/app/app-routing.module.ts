import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JoblistComponent } from './components/joblist/joblist.component';
import { HomeComponent } from './components/home/home.component';
import { JobDetailsComponent } from './components/job-details/job-details.component';
import { EditJobpostComponent } from './components/edit-jobpost/edit-jobpost.component';



const routes: Routes = [
  {
    path: 'joblist/view/:id',
    component: EditJobpostComponent,
  },
  {
    path: 'joblist',
    component: JoblistComponent,
  },
  {
    path: 'jobpost',
    component: HomeComponent
  },
  {
    path: '',
    component: HomeComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
