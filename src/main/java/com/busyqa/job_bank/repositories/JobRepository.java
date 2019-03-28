package com.busyqa.job_bank.repositories;


import com.busyqa.job_bank.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobRepository extends JpaRepository<Job,Long> {
}
