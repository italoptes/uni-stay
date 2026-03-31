package com.unistay.demo.service;

import com.unistay.demo.entity.User;
import com.unistay.demo.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;

	public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
	}

	public User createUser(User user) {
		if (user.getUsername() == null || user.getUsername().isBlank()) {
			throw new IllegalArgumentException("Username cannot be null or blank");
		}

		if (user.getPassword() == null || user.getPassword().isBlank()) {
			throw new IllegalArgumentException("Password cannot be null or blank");
		}

		if (userRepository.existsByUsername(user.getUsername())) {
			throw new IllegalArgumentException("Username already exists");
		}

		user.setPassword(passwordEncoder.encode(user.getPassword()));
		return userRepository.save(user);
	}

	public Optional<User> login(String username, String password) {
		return userRepository.findByUsername(username)
				.flatMap(user -> passwordEncoder.matches(password, user.getPassword())
						? Optional.of(user)
						: Optional.empty());
	}

	public Optional<User> findById(Long id) {
		return userRepository.findById(id);
	}

	public Optional<User> findByUsername(String username) {
		return userRepository.findByUsername(username);
	}
}