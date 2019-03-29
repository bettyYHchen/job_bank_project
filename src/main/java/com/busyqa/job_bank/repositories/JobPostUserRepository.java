package com.busyqa.job_bank.repositories;

import com.busyqa.job_bank.model.JobPostUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobPostUserRepository extends JpaRepository<JobPostUser, Long> {

    JobPostUser findFirst1ByUserNameAndPassword(String userName, String password);
}
