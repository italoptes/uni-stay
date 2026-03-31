package com.unistay.demo.dto;

public record UserResponseDTO(
        Long id,
        String username,
        String phoneNumber
) {
}