package com.unistay.demo.service;

import com.unistay.demo.entity.Residence;
import com.unistay.demo.entity.User;
import com.unistay.demo.repository.ResidenceRepository;
import com.unistay.demo.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

@Service
public class ResidenceServiceImpl implements ResidenceService {

	private final ResidenceRepository residenceRepository;
	private final UserRepository userRepository;

	public ResidenceServiceImpl(ResidenceRepository residenceRepository, UserRepository userRepository) {
		this.residenceRepository = residenceRepository;
		this.userRepository = userRepository;
	}

	@Override
	public Residence createResidence(Residence residence, Long userId) {
		if (residence.getTitle() == null || residence.getTitle().isBlank()) {
			throw new IllegalArgumentException();
		}
		if (residence.getLocation() == null || residence.getLocation().isBlank()) {
			throw new IllegalArgumentException();
		}
		if (residence.getPrice() == null || residence.getPrice().compareTo(BigDecimal.ZERO) <= 0) {
			throw new IllegalArgumentException();
		}
		User user = userRepository.findById(userId).orElseThrow(EntityNotFoundException::new);
		residence.setUser(user);
		return residenceRepository.save(residence);
	}

	@Override
	public List<Residence> getAllResidences() {
		return residenceRepository.findAll();
	}

	@Override
	public Optional<Residence> getResidenceById(Long id) {
		return residenceRepository.findById(id);
	}

	@Override
	public Residence updateResidence(Long id, Residence updated, Long userId) {
		Residence existing = residenceRepository.findById(id).orElseThrow(EntityNotFoundException::new);
		userRepository.findById(userId).orElseThrow(EntityNotFoundException::new);
		if (!existing.getUser().getId().equals(userId)) {
			throw new AccessDeniedException("Not owner");
		}
		if (updated.getTitle() == null || updated.getTitle().isBlank()) {
			throw new IllegalArgumentException();
		}
		if (updated.getLocation() == null || updated.getLocation().isBlank()) {
			throw new IllegalArgumentException();
		}
		if (updated.getPrice() == null || updated.getPrice().compareTo(BigDecimal.ZERO) <= 0) {
			throw new IllegalArgumentException();
		}
		existing.setTitle(updated.getTitle());
		existing.setDescription(updated.getDescription());
		existing.setLocation(updated.getLocation());
		existing.setPrice(updated.getPrice());
		existing.setContactPhone(updated.getContactPhone());
		return residenceRepository.save(existing);
	}

	@Override
	public void deleteResidence(Long id, Long userId) {
		Residence existing = residenceRepository.findById(id).orElseThrow(EntityNotFoundException::new);
		userRepository.findById(userId).orElseThrow(EntityNotFoundException::new);
		if (!existing.getUser().getId().equals(userId)) {
			throw new AccessDeniedException("Not owner");
		}
		residenceRepository.delete(existing);
	}
}
