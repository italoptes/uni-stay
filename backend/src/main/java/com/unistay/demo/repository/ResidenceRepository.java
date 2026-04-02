package com.unistay.demo.repository;

import com.unistay.demo.entity.Residence;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResidenceRepository extends JpaRepository<Residence, Long> {
}
