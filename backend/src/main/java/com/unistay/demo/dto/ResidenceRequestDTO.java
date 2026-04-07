package com.unistay.demo.dto;

import com.unistay.demo.entity.ResidenceType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

public record ResidenceRequestDTO(
        @NotBlank
        @Size(max = 100)
        String title,

        @Size(max = 500)
        String description,

        @NotBlank
        @Size(max = 150)
        String location,

        @NotNull
        @Positive
        BigDecimal price,

        @NotBlank
        @Size(max = 20)
        String contactPhone,

        @Size(max = 500)
        String imageUrl,

        ResidenceType type,

        Integer capacity,

        Integer bathrooms,

        Integer currentResidents
) {
}
