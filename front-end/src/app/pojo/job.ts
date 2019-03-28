import { JobType } from './job-type';
import { JobCompany } from './job-company';
export class Job {
    id: number;
    jobCompany: JobCompany;
    jobType: JobType;
    jobTitle: string;
    jobDescription: string;
    requirement: string;
    location: string;
    salary: number;
    postDate: Date;
}
