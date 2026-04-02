package com.unistay.demo.controller;

import com.unistay.demo.dto.LoginRequestDTO;
import com.unistay.demo.dto.UserRequestDTO;
import com.unistay.demo.openapi.AuthControllerOpenApi;
import com.unistay.demo.service.JwtTokenService;
import com.unistay.demo.entity.User;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController implements AuthControllerOpenApi {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenService tokenService;

    public AuthController(AuthenticationManager authenticationManager,
                          JwtTokenService tokenService) {
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequestDTO dto) {

        var authToken = new UsernamePasswordAuthenticationToken(
                dto.username(), dto.password());

        var auth = authenticationManager.authenticate(authToken);

        var user = (User) auth.getPrincipal();

        var token = tokenService.generateToken(user);

        return ResponseEntity.ok(token);
    }
}