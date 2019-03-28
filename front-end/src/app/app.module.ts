import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JobService } from './services/job.service';
import { JoblistComponent } from './components/joblist/joblist.component';
import { HomeComponent } from './components/home/home.component';
import { JobDetailsComponent } from './components/job-details/job-details.component';
import { EditJobpostComponent } from './components/edit-jobpost/edit-jobpost.component';




@NgModule({
  declarations: [
    AppComponent,
    JoblistComponent,
    HomeComponent,
    JobDetailsComponent,
    EditJobpostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [JobService],
  bootstrap: [AppComponent]
})
export class AppModule { }
