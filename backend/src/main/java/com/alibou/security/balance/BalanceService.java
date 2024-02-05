package com.alibou.security.balance;

import java.time.LocalDateTime;
import java.util.List; // Import java.util.List

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BalanceService {

    private final BalanceRepository repository;

    public void save(BalanceRequest request, String createdBy) {
        LocalDateTime currentDateTime = LocalDateTime.now();
        var balance = Balance.builder()
                .amount(request.getAmount())
                .type(request.getType())
                .description(request.getDescription())
                .addDate(currentDateTime)
                .build();
        repository.save(balance);
    }

    public List<Balance> findAll() {
        return repository.findAll();
    }
}
