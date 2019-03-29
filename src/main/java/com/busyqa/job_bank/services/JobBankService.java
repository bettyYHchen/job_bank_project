package com.busyqa.job_bank.services;

import com.busyqa.job_bank.model.*;
import com.busyqa.job_bank.repositories.JobCompanyRepository;
import com.busyqa.job_bank.repositories.JobPostUserRepository;
import com.busyqa.job_bank.repositories.JobRepository;
import com.busyqa.job_bank.repositories.JobTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicReference;
import javax.servlet.http.HttpSession;


@Service
public class JobBankService {

    @Autowired
    private JobCompanyRepository jobCompanyRepository;

    @Autowired
    private JobTypeRepository jobTypeRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private JobPostUserRepository jobPostUserRepository;

    public JobBankService() {
    }



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

    public JobLoginStatus login(JobPostUser jobPostUser, HttpSession session) {
        JobLoginStatus jobLoginStatus = new JobLoginStatus();

        if (session.getAttribute("id") != null &&
                session.getAttribute("login") != null &&
                (boolean) session.getAttribute("login")) {
            jobLoginStatus.setLogin(true);
            System.out.println("LOGIN already");
        } else {
            System.out.println("not Login yet");

            if (jobPostUserRepository.findFirst1ByUserNameAndPassword(jobPostUser.getUserName(), jobPostUser.getPassword()) != null) {
                session.setAttribute("id", session.getId());
                session.setAttribute("login", true);
                jobLoginStatus.setLogin(true);
                System.out.println(" LOGIN");
            } else {
                session.setAttribute("login", false);
                jobLoginStatus.setLogin(false);
                System.out.println(" LOGIN FAIL: username & password not match");
            }

        }

        return jobLoginStatus;
    }

    public JobLoginStatus checkLoginSessionStatus(HttpSession session) {
        JobLoginStatus jobLoginStatus = new JobLoginStatus();

        if (session.getAttribute("id") != null && session.getAttribute("login") != null && (boolean) session.getAttribute("login")) {
            jobLoginStatus.setLogin(true);
        } else {
            jobLoginStatus.setLogin(false);
        }
        return jobLoginStatus;

    }




}
