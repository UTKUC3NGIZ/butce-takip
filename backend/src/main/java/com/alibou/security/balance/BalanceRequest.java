package com.alibou.security.balance;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Builder
public class BalanceRequest {
    private BigDecimal amount;
    private String type;
    private String description;
}
