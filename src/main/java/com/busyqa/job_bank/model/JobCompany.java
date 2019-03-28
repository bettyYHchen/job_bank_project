package com.busyqa.job_bank.model;



import javax.persistence.*;

@Entity
@Table(name = "JobCompany")
public class JobCompany {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String companyName;
    private String contactor;
    private String email;
    private String phone;
    private Double size;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getContactor() {
        return contactor;
    }

    public void setContactor(String contactor) {
        this.contactor = contactor;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Double getSize() {
        return size;
    }

    public void setSize(Double size) {
        this.size = size;
    }
}
