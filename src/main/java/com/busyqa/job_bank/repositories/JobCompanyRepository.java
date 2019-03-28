package com.busyqa.job_bank.repositories;


import com.busyqa.job_bank.model.JobCompany;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobCompanyRepository extends JpaRepository<JobCompany,Long> {
}
