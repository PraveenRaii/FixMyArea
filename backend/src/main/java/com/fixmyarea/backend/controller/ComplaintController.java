package com.fixmyarea.backend.controller;

import com.fixmyarea.backend.entity.Complaint;
import com.fixmyarea.backend.entity.User;
import com.fixmyarea.backend.repository.ComplaintRepository;
import com.fixmyarea.backend.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.access.prepost.PreAuthorize;


@RestController
@RequestMapping("/api/complaints")
public class ComplaintController {

    private final ComplaintRepository complaintRepository;
    private final UserRepository userRepository;

    public ComplaintController(
            ComplaintRepository complaintRepository,
            UserRepository userRepository) {

        this.complaintRepository = complaintRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/test")
    public String test() {
        return "Complaint API is working!";
    }

    @PostMapping
    public ResponseEntity<?> createComplaint(
            @RequestBody Complaint complaint,
            Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        complaint.setUser(user);

        Complaint savedComplaint = complaintRepository.save(complaint);

        return ResponseEntity.ok(savedComplaint);

    }

    @GetMapping("/my")
    public ResponseEntity<?> getMyComplaints(Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return ResponseEntity.ok(
                complaintRepository.findByUser(user));
    }
@PreAuthorize("hasAnyRole('ADMIN', 'OFFICER')")
    @PutMapping("/{id}/status")
public ResponseEntity<?> updateStatus(
        @PathVariable Long id,
        @RequestParam String status) {

    Complaint complaint = complaintRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Complaint not found"));

    complaint.setStatus(status);

    Complaint updatedComplaint = complaintRepository.save(complaint);

    return ResponseEntity.ok(updatedComplaint);
}

@PreAuthorize("hasAnyRole('ADMIN', 'OFFICER')")
@GetMapping
public ResponseEntity<?> getAllComplaints() {

    return ResponseEntity.ok(
            complaintRepository.findAll()
    );
}
}

