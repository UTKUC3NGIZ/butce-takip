package com.example.demo;

import com.example.demo.model.Person;
import com.example.demo.repo.PersonRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PersonController {

    @Autowired
    PersonRepo repo;

    @PostMapping("/register")
    public String registerPerson(@RequestBody Person person) {
        repo.save(person);

        return "Registration successful for user: " + person.getName();
    }

    @PostMapping("/login")
    public String login(@RequestBody Person loginRequest) {
        Person user = repo.findByEmail(loginRequest.getEmail());

        if (user != null && user.getPassword().equals(loginRequest.getPassword())) {
            return "Login successful for user: " + user.getName();
        } else {
            return "Login failed. Invalid credentials.";
        }
    }
}
