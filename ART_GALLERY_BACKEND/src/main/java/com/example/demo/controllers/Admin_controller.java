package com.example.demo.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.example.demo.models.Admin_details;
import com.example.demo.repos.Admin_repo;

@RestController
@RequestMapping("/admin")
public class Admin_controller {

    @Autowired
    private Admin_repo adminRepo;
    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping("/signup")
    public String signup(@RequestBody Admin_details a) {
        if(adminRepo.findByEmail(a.getEmail()).isPresent()) { // check by email
            return "Email already exists";
        }

        a.setPassword(passwordEncoder.encode(a.getPassword()));
        adminRepo.save(a);
        return "Signup successful";
    }

    @PostMapping("/login")
    public String login(@RequestBody Admin_details a) {
        Optional<Admin_details> p = adminRepo.findByEmail(a.getEmail()); // login by email

        if(p.isPresent()) {
            if(passwordEncoder.matches(a.getPassword(), p.get().getPassword())) {
                return "Login success";
            } else {
                return "Invalid password";
            }
        }

        return "User not found";
    }
}
