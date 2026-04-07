package com.unistay.demo.dto;

import com.unistay.demo.entity.Residence;

import java.math.BigDecimal;

public record ResidenceResponseDTO(
        Long id,
        String title,
        String description,
        String location,
        BigDecimal price,
        String contactPhone,
        String imageUrl,
        Long userId
) {
    public static ResidenceResponseDTO fromEntity(Residence residence) {
        return new ResidenceResponseDTO(
                residence.getId(),
                residence.getTitle(),
                residence.getDescription(),
                residence.getLocation(),
                residence.getPrice(),
                residence.getContactPhone(),
                residence.getImageUrl(),
                residence.getUser().getId()
        );
    }
}
