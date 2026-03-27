package com.unistay.demo.service;

import com.unistay.demo.entity.Residence;
import java.util.List;
import java.util.Optional;

public interface ResidenceService {

	Residence createResidence(Residence residence, Long userId);

	List<Residence> getAllResidences();

	Optional<Residence> getResidenceById(Long id);

	Residence updateResidence(Long id, Residence updated, Long userId);

	void deleteResidence(Long id, Long userId);
}
