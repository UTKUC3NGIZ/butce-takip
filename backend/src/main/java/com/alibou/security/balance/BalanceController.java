package com.alibou.security.balance;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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
}
