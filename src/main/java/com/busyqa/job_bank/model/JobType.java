package com.busyqa.job_bank.model;

import javax.persistence.*;

@Entity
@Table(name = "JobType")
public class JobType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(updatable = false)
    private String jobTypeName;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getJobTypeName() {
        return jobTypeName;
    }

    public void setJobTypeName(String jobTypeName) {
        this.jobTypeName = jobTypeName;
    }
}