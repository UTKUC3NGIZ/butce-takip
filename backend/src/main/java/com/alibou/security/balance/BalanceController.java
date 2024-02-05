package com.alibou.security.balance;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List; // Import java.util.List

@CrossOrigin
@RestController
@RequestMapping("/api/v1/balances")
@RequiredArgsConstructor
public class BalanceController {

    private final BalanceService service;

    @PostMapping
    public ResponseEntity<?> save(@RequestBody BalanceRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
        service.save(request, currentPrincipalName);
        return ResponseEntity.accepted().build();
    }

    @GetMapping
    public ResponseEntity<List<Balance>> findAllBalances() {
        return ResponseEntity.ok(service.findAll());
    }
@PutMapping("/{id}")
public ResponseEntity<?> updateBalance(@PathVariable Integer id, @RequestBody BalanceRequest request) {
    try {
        service.updateBalance(id, request);
        return ResponseEntity.ok().build();
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Failed to update balance item with ID " + id);
    }
}

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBalance(@PathVariable Integer id) {
        try {
            service.deleteById(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to delete balance item with ID " + id);
        }
    }
}
