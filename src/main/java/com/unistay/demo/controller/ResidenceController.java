package com.unistay.demo.controller;

import com.unistay.demo.dto.ResidenceRequestDTO;
import com.unistay.demo.dto.ResidenceResponseDTO;
import com.unistay.demo.entity.Residence;
import com.unistay.demo.service.ResidenceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/residences")
public class ResidenceController {

    private final ResidenceService residenceService;

    public ResidenceController(ResidenceService residenceService) {
        this.residenceService = residenceService;
    }

    @PostMapping
    public ResponseEntity<ResidenceResponseDTO> create(@RequestBody ResidenceRequestDTO dto) {

        Residence residence = new Residence();
        residence.setTitle(dto.title());
        residence.setDescription(dto.description());
        residence.setLocation(dto.location());
        residence.setPrice(dto.price());
        residence.setContactPhone(dto.contactPhone());

        Residence saved = residenceService.createResidence(residence, dto.userId());

        ResidenceResponseDTO response = new ResidenceResponseDTO(
                saved.getId(),
                saved.getTitle(),
                saved.getDescription(),
                saved.getLocation(),
                saved.getPrice(),
                saved.getContactPhone(),
                saved.getUser().getId()
        );

        return ResponseEntity.status(201).body(response);
    }

    @GetMapping
    public ResponseEntity<List<ResidenceResponseDTO>> getAll() {

        List<ResidenceResponseDTO> response = residenceService.getAllResidences()
                .stream()
                .map(r -> new ResidenceResponseDTO(
                        r.getId(),
                        r.getTitle(),
                        r.getDescription(),
                        r.getLocation(),
                        r.getPrice(),
                        r.getContactPhone(),
                        r.getUser().getId()
                ))
                .toList();

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResidenceResponseDTO> getById(@PathVariable Long id) {

        return residenceService.getResidenceById(id)
                .map(r -> ResponseEntity.ok(
                        new ResidenceResponseDTO(
                                r.getId(),
                                r.getTitle(),
                                r.getDescription(),
                                r.getLocation(),
                                r.getPrice(),
                                r.getContactPhone(),
                                r.getUser().getId()
                        )
                ))
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResidenceResponseDTO> update(@PathVariable Long id,
                                                       @RequestBody ResidenceRequestDTO dto) {

        Residence updated = new Residence();
        updated.setTitle(dto.title());
        updated.setDescription(dto.description());
        updated.setLocation(dto.location());
        updated.setPrice(dto.price());
        updated.setContactPhone(dto.contactPhone());

        Residence saved = residenceService.updateResidence(id, updated, dto.userId());

        ResidenceResponseDTO response = new ResidenceResponseDTO(
                saved.getId(),
                saved.getTitle(),
                saved.getDescription(),
                saved.getLocation(),
                saved.getPrice(),
                saved.getContactPhone(),
                saved.getUser().getId()
        );

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id,
                                       @RequestParam Long userId) {

        residenceService.deleteResidence(id, userId);
        return ResponseEntity.noContent().build();
    }
}