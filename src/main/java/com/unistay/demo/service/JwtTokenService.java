package com.unistay.demo.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.unistay.demo.entity.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class JwtTokenService {

    @Value("${api.security.secret}")
    private String secret;

    public String generateToken(User user) {
        Algorithm algorithm = Algorithm.HMAC256(secret);

        return JWT.create()
                .withIssuer("unistay-api")
                .withSubject(user.getUsername())
                .withExpiresAt(generateExpirationDate())
                .sign(algorithm);
    }

    public String validateToken(String token) {
        Algorithm algorithm = Algorithm.HMAC256(secret);

        return JWT.require(algorithm)
                .withIssuer("unistay-api")
                .build()
                .verify(token)
                .getSubject();
    }

    private Instant generateExpirationDate() {
        return LocalDateTime.now()
                .plusHours(2)
                .toInstant(ZoneOffset.of("-03:00"));
    }
}