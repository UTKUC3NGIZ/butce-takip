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

    @PostMapping("addPerson")
    public void addPerson(@RequestBody Person person) {
        repo.save(person);
    }
}
