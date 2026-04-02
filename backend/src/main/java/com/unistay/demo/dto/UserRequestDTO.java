package com.unistay.demo.dto;

public record UserRequestDTO(
        String username,
        String password,
        String phoneNumber
) {
}