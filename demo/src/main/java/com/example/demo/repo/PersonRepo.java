package com.example.demo.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.example.demo.model.Person;

@RepositoryRestResource
public interface PersonRepo extends JpaRepository<Person, Long> {

}
