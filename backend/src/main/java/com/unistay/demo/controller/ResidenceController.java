package com.unistay.demo.controller;

import com.unistay.demo.dto.ResidenceRequestDTO;
import com.unistay.demo.dto.ResidenceResponseDTO;
import com.unistay.demo.entity.Residence;
import com.unistay.demo.entity.User;
import com.unistay.demo.openapi.ResidenceControllerOpenApi;
import com.unistay.demo.service.ResidenceService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/residences")
public class ResidenceController implements ResidenceControllerOpenApi {

    private final ResidenceService residenceService;

    public ResidenceController(ResidenceService residenceService) {
        this.residenceService = residenceService;
    }

    @PostMapping
    public ResponseEntity<ResidenceResponseDTO> create(@RequestBody @Valid ResidenceRequestDTO dto) {

        var auth = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) auth.getPrincipal();

        Residence residence = new Residence();
        residence.setTitle(dto.title());
        residence.setDescription(dto.description());
        residence.setLocation(dto.location());
        residence.setPrice(dto.price());
        residence.setContactPhone(dto.contactPhone());
        residence.setImageUrl(dto.imageUrl());

        Residence saved = residenceService.createResidence(residence, user.getId());

        return ResponseEntity.status(201).body(ResidenceResponseDTO.fromEntity(saved));
    }

    @GetMapping
    public ResponseEntity<List<ResidenceResponseDTO>> getAll() {

        List<ResidenceResponseDTO> response = residenceService.getAllResidences()
                .stream()
                .map(ResidenceResponseDTO::fromEntity)
                .toList();

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResidenceResponseDTO> getById(@PathVariable Long id) {

        return residenceService.getResidenceById(id)
                .map(r -> ResponseEntity.ok(ResidenceResponseDTO.fromEntity(r)))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/me")
    public ResponseEntity<List<ResidenceResponseDTO>> getMine() {

        var auth = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) auth.getPrincipal();

        List<ResidenceResponseDTO> response = residenceService.getResidencesByUser(user.getId())
                .stream()
                .map(ResidenceResponseDTO::fromEntity)
                .toList();

        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResidenceResponseDTO> update(@PathVariable Long id,
                                                       @RequestBody @Valid ResidenceRequestDTO dto) {

        var auth = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) auth.getPrincipal();

        Residence updated = new Residence();
        updated.setTitle(dto.title());
        updated.setDescription(dto.description());
        updated.setLocation(dto.location());
        updated.setPrice(dto.price());
        updated.setContactPhone(dto.contactPhone());
        updated.setImageUrl(dto.imageUrl());

        Residence saved = residenceService.updateResidence(id, updated, user.getId());

        return ResponseEntity.ok(ResidenceResponseDTO.fromEntity(saved));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {

        var auth = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) auth.getPrincipal();

        residenceService.deleteResidence(id, user.getId());

        return ResponseEntity.noContent().build();
    }
}
