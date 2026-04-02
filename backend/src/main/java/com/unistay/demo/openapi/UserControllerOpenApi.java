package com.unistay.demo.openapi;

import com.unistay.demo.dto.UserRequestDTO;
import com.unistay.demo.dto.UserResponseDTO;
import io.swagger.v3.oas.annotations.*;
import io.swagger.v3.oas.annotations.responses.*;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;

@Tag(name = "Users", description = "Gerenciamento de usuários")
public interface UserControllerOpenApi {

    @Operation(summary = "Criar usuário", description = "Cria um novo usuário no sistema", security = {})
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Usuário criado com sucesso"),
            @ApiResponse(responseCode = "400", description = "Dados inválidos")
    })
    ResponseEntity<UserResponseDTO> createUser(UserRequestDTO dto);

    @Operation(summary = "Buscar usuário por ID")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Usuário encontrado"),
            @ApiResponse(responseCode = "404", description = "Usuário não encontrado")
    })
    ResponseEntity<UserResponseDTO> getById(Long id);
}