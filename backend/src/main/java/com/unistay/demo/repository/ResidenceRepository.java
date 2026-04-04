package com.unistay.demo.repository;

import com.unistay.demo.entity.Residence;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResidenceRepository extends JpaRepository<Residence, Long> {
	List<Residence> findByUserId(Long userId);
}
