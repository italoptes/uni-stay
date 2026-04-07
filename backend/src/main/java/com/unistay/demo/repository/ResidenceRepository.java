package com.unistay.demo.repository;

import com.unistay.demo.entity.Residence;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResidenceRepository extends JpaRepository<Residence, Long> {
	Page<Residence> findAll(Pageable pageable);

	List<Residence> findByUserId(Long userId);
}
