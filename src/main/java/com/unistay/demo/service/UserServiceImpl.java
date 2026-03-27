package com.unistay.demo.service;

import com.unistay.demo.entity.User;
import com.unistay.demo.repository.UserRepository;
import java.util.Optional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;

	public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
	}

	@Override
	public User createUser(User user) {
		if (user.getUsername() == null) {
			throw new IllegalArgumentException();
		}
		if (user.getUsername().isBlank()) {
			throw new IllegalArgumentException();
		}
		if (userRepository.existsByUsername(user.getUsername())) {
			throw new IllegalArgumentException();
		}
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		return userRepository.save(user);
	}

	@Override
	public Optional<User> login(String username, String password) {
		return userRepository.findByUsername(username)
				.flatMap(user -> passwordEncoder.matches(password, user.getPassword())
						? Optional.of(user)
						: Optional.empty());
	}

	@Override
	public Optional<User> findById(Long id) {
		return userRepository.findById(id);
	}

	@Override
	public Optional<User> findByUsername(String username) {
		return userRepository.findByUsername(username);
	}
}
