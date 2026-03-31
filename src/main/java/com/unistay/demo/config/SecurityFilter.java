package com.unistay.demo.config;

import com.unistay.demo.repository.UserRepository;
import com.unistay.demo.service.JwtTokenService;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class SecurityFilter extends OncePerRequestFilter {

    private final JwtTokenService tokenService;
    private final UserRepository repository;

    public SecurityFilter(JwtTokenService tokenService, UserRepository repository) {
        this.tokenService = tokenService;
        this.repository = repository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String token = recoverToken(request);

        if (token != null) {
            String username = tokenService.validateToken(token);

            var user = repository.findByUsername(username).orElse(null);

            if (user != null) {
                var auth = new UsernamePasswordAuthenticationToken(
                        user, null, user.getAuthorities());

                SecurityContextHolder.getContext().setAuthentication(auth);
            }
        }

        filterChain.doFilter(request, response);
    }

    private String recoverToken(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        if (header == null) return null;
        return header.replace("Bearer ", "");
    }
}