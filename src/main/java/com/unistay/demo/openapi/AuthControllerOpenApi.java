package com.unistay.demo.openapi;

import com.unistay.demo.dto.UserRequestDTO;
import io.swagger.v3.oas.annotations.*;
import io.swagger.v3.oas.annotations.responses.*;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;

@Tag(name = "Auth", description = "Autenticação")
public interface AuthControllerOpenApi {

    @Operation(
            summary = "Login",
            description = "Autentica usuário e retorna token JWT",
            security = {}
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Login realizado com sucesso"),
            @ApiResponse(responseCode = "401", description = "Credenciais inválidas")
    })
    ResponseEntity<String> login(UserRequestDTO dto);
}