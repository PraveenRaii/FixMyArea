package com.fixmyarea.backend.repository;

import com.fixmyarea.backend.entity.Complaint;
import com.fixmyarea.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ComplaintRepository extends JpaRepository<Complaint, Long> {

    List<Complaint> findByUser(User user);

}