package com.alibou.security.balance;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Balance {

    @Id
    @GeneratedValue
    private Integer id;

    @CreatedBy
    @Column(nullable = false, updatable = false)
    private Integer createdBy;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createDate;

    private LocalDateTime addDate; // User-provided date

    private BigDecimal amount;
    private String type; // Gelir veya gider
    private String description;
}
