package com.busyqa.job_bank.repositories;


import com.busyqa.job_bank.model.JobType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobTypeRepository extends JpaRepository<JobType,Long> {
}