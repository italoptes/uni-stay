package com.unistay.demo.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UserRequestDTO(
        @NotBlank
        @Size(max = 50)
        String username,

        @NotBlank
        @Size(min = 6, max = 255)
        String password,

        @NotBlank
        @Size(max = 20)
        String phoneNumber
) {
}
