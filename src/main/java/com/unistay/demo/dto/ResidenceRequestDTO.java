package com.unistay.demo.dto;

import java.math.BigDecimal;

public record ResidenceRequestDTO(
        String title,
        String description,
        String location,
        BigDecimal price,
        String contactPhone,
        Long userId
) {
}