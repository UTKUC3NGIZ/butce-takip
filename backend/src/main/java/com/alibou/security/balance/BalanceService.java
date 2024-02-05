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
    public void updateBalance(Integer id, BalanceRequest request) {
        Balance existingBalance = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Balance not found with ID " + id));
    
        existingBalance.setAmount(request.getAmount());
        existingBalance.setType(request.getType());
        existingBalance.setDescription(request.getDescription());
    
        repository.save(existingBalance);
    }
    
    public void deleteById(Integer id) {
        repository.deleteById(id);
    }

    public List<Balance> findAll() {
        return repository.findAll();
    }
}
