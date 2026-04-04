package com.unistay.demo.service;

import com.unistay.demo.entity.Residence;
import com.unistay.demo.entity.User;
import com.unistay.demo.repository.ResidenceRepository;
import com.unistay.demo.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
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

	public List<Residence> getAllResidences() {
		return residenceRepository.findAll();
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
