package com.unistay.demo.controller;

import com.unistay.demo.entity.User;
import com.unistay.demo.service.UserService;
import java.util.Optional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

	private final UserService userService;

	public UserController(UserService userService) {
		this.userService = userService;
	}

	@PostMapping("/users")
	public User createUser(@RequestBody User user) {
		return userService.createUser(user);
	}

	@PostMapping("/login")
	public Optional<User> login(@RequestParam String username, @RequestParam String password) {
		return userService.login(username, password);
	}
}
