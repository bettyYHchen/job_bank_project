package com.busyqa.job_bank.services;

import com.busyqa.job_bank.model.Job;
import com.busyqa.job_bank.model.JobCompany;
import com.busyqa.job_bank.model.JobType;
import com.busyqa.job_bank.repositories.JobCompanyRepository;
import com.busyqa.job_bank.repositories.JobRepository;
import com.busyqa.job_bank.repositories.JobTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.atomic.AtomicReference;

@Service
public class JobBankService {

    @Autowired
    private JobCompanyRepository jobCompanyRepository;

    @Autowired
    private JobTypeRepository jobTypeRepository;

    @Autowired
    private JobRepository jobRepository;

    public List<Job> list() {return this.jobRepository.findAll();}

    public Job listById(Long id) {return this.jobRepository.getOne(id);}

    public Job create(Job job) {
        JobCompany jobCompany = job.getJobCompany();
        JobType jobType = job.getJobType();

        if (jobCompany != null && jobCompany.getId() == 0) {
            job.setJobCompany(this.jobCompanyRepository.save(jobCompany));
        }
        if (jobType != null) {
            job.setJobType(this.jobTypeRepository.save(jobType));
        }


        this.jobRepository.save(job);
        return job;
    }

    public ResponseEntity<Job> update(Long id, Job job) {


        JobCompany jobCompany = job.getJobCompany();

        final AtomicReference<JobCompany> reference = new AtomicReference<>(jobCompany);

        if (jobCompany != null) {
            jobCompanyRepository.findById(jobCompany.getId()).map(record -> {
                        record.setCompanyName(jobCompany.getCompanyName());
                        record.setContactor(jobCompany.getContactor());
                        record.setEmail(jobCompany.getEmail());
                        record.setPhone(jobCompany.getPhone());
                        record.setSize(jobCompany.getSize());
                        reference.set(jobCompanyRepository.save(record));
                        return null;
                    }

            );


        }


        return jobRepository.findById(id).map(recordUpdated -> {
            recordUpdated.setJobTitle(job.getJobTitle());
            recordUpdated.setJobDescription(job.getJobDescription());
            recordUpdated.setRequirement(job.getRequirement());
            recordUpdated.setLocation(job.getLocation());
            recordUpdated.setSalary(job.getSalary());
            recordUpdated.setPostDate(job.getPostDate());
            recordUpdated.setJobCompany(reference.get());
            recordUpdated.setJobType(job.getJobType());
            this.jobRepository.save(recordUpdated);
            return ResponseEntity.ok().body(recordUpdated);
        }).orElse(ResponseEntity.notFound().build());


    }

    public ResponseEntity<?> delete(Long id) {
        return jobRepository.findById(id).map(
                record -> {
                    jobRepository.deleteById(id);
                    return ResponseEntity.ok().build();
                }).orElse(ResponseEntity.notFound().build());

    }




}
