package com.unistay.demo.service;

import com.unistay.demo.entity.User;
import java.util.Optional;

public interface UserService {

	User createUser(User user);

	Optional<User> login(String username, String password);

	Optional<User> findById(Long id);

	Optional<User> findByUsername(String username);
}
