package com.unistay.demo.service;

import com.unistay.demo.dto.UserRequestDTO;
import com.unistay.demo.dto.UserResponseDTO;
import com.unistay.demo.entity.User;
import com.unistay.demo.repository.UserRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
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

	public List<UserResponseDTO> listAllUser() {

		List<UserResponseDTO> list = userRepository.findAll()
				.stream()
				.map(user -> new UserResponseDTO(
						user.getId(),
						user.getUsername(),
						user.getPhoneNumber()
				))
				.toList();

		return list;
	}

	public Optional<User> findById(Long id) {
		return userRepository.findById(id);
	}

	public Optional<User> findByUsername(String username) {
		return userRepository.findByUsername(username);
	}
}