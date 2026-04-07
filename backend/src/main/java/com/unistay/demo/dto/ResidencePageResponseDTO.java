package com.unistay.demo.dto;

import java.util.List;

public record ResidencePageResponseDTO(
		List<ResidenceResponseDTO> content,
		int currentPage,
		int totalPages,
		long totalElements
) {
}
