package com.busyqa.job_bank.controllers;


import com.busyqa.job_bank.model.Job;
import com.busyqa.job_bank.services.JobBankService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/api/v2/jobs")
public class JobPostController {

    @Autowired
    private JobBankService jobBankService;


    @GetMapping
    public List<Job> list(){
        return this.jobBankService.list();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public Job create(@RequestBody Job job) {
        return this.jobBankService.create(job);
    }

    @GetMapping("/{id}")
    public Job get(@PathVariable("id") Long id) {
        return this.jobBankService.listById(id);

    }


    @PutMapping("/{id}")
    public ResponseEntity<Job> update(@PathVariable("id") Long id, @RequestBody Job job) {
        return jobBankService.update(id,job);

    }

    @DeleteMapping("{id}")
    public  ResponseEntity<?> delete(@PathVariable("id") Long id) {
        return jobBankService.delete(id);
    }




}

