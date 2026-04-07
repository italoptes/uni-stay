package com.unistay.demo.service;

import com.unistay.demo.dto.ResidencePageResponseDTO;
import com.unistay.demo.dto.ResidenceResponseDTO;
import com.unistay.demo.entity.Residence;
import com.unistay.demo.entity.User;
import com.unistay.demo.repository.ResidenceRepository;
import com.unistay.demo.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ResidenceService {

	private final ResidenceRepository residenceRepository;
	private final UserRepository userRepository;

	public ResidenceService(ResidenceRepository residenceRepository, UserRepository userRepository) {
		this.residenceRepository = residenceRepository;
		this.userRepository = userRepository;
	}

	public Residence createResidence(Residence residence, Long userId) {
		validateResidence(residence);

		User user = userRepository.findById(userId)
				.orElseThrow(() -> new EntityNotFoundException("User not found"));

		residence.setUser(user);
		return residenceRepository.save(residence);
	}

	public ResidencePageResponseDTO getAllResidences(int page, int size) {
		PageRequest pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "id"));
		Page<Residence> residencePage = residenceRepository.findAll(pageable);

		return new ResidencePageResponseDTO(
				residencePage.getContent()
						.stream()
						.map(ResidenceResponseDTO::fromEntity)
						.toList(),
				residencePage.getNumber(),
				residencePage.getTotalPages(),
				residencePage.getTotalElements()
		);
	}

	public Optional<Residence> getResidenceById(Long id) {
		return residenceRepository.findById(id);
	}

	public List<Residence> getResidencesByUser(Long userId) {
		userRepository.findById(userId)
				.orElseThrow(() -> new EntityNotFoundException("User not found"));

		return residenceRepository.findByUserId(userId);
	}

	public Residence updateResidence(Long id, Residence updated, Long userId) {
		Residence existing = residenceRepository.findById(id)
				.orElseThrow(() -> new EntityNotFoundException("Residence not found"));

		userRepository.findById(userId)
				.orElseThrow(() -> new EntityNotFoundException("User not found"));

		if (!existing.getUser().getId().equals(userId)) {
			throw new AccessDeniedException("User is not the owner of this residence");
		}

		validateResidence(updated);

		existing.setTitle(updated.getTitle());
		existing.setDescription(updated.getDescription());
		existing.setLocation(updated.getLocation());
		existing.setPrice(updated.getPrice());
		existing.setContactPhone(updated.getContactPhone());
		existing.setImageUrl(updated.getImageUrl());

		return residenceRepository.save(existing);
	}

	public void deleteResidence(Long id, Long userId) {
		Residence existing = residenceRepository.findById(id)
				.orElseThrow(() -> new EntityNotFoundException("Residence not found"));

		userRepository.findById(userId)
				.orElseThrow(() -> new EntityNotFoundException("User not found"));

		if (!existing.getUser().getId().equals(userId)) {
			throw new AccessDeniedException("User is not the owner of this residence");
		}

		residenceRepository.delete(existing);
	}

	private void validateResidence(Residence residence) {
	}
}
