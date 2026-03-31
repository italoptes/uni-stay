package com.unistay.demo.openapi;

import com.unistay.demo.dto.ResidenceRequestDTO;
import com.unistay.demo.dto.ResidenceResponseDTO;
import io.swagger.v3.oas.annotations.*;
import io.swagger.v3.oas.annotations.responses.*;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Tag(name = "Residences", description = "Gerenciamento de residências")
public interface ResidenceControllerOpenApi {

    @Operation(summary = "Criar residência")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Criado com sucesso"),
            @ApiResponse(responseCode = "400", description = "Dados inválidos")
    })
    ResponseEntity<ResidenceResponseDTO> create(ResidenceRequestDTO dto);

    @Operation(summary = "Listar residências")
    ResponseEntity<List<ResidenceResponseDTO>> getAll();

    @Operation(summary = "Buscar residência por ID")
    ResponseEntity<ResidenceResponseDTO> getById(Long id);

    @Operation(summary = "Atualizar residência")
    ResponseEntity<ResidenceResponseDTO> update(Long id, ResidenceRequestDTO dto);

    @Operation(summary = "Deletar residência")
    ResponseEntity<Void> delete(Long id);
}