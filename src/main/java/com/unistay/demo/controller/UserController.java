package com.unistay.demo.controller;

import com.unistay.demo.dto.UserRequestDTO;
import com.unistay.demo.dto.UserResponseDTO;
import com.unistay.demo.entity.User;
import com.unistay.demo.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

	private final UserService userService;

	public UserController(UserService userService) {
		this.userService = userService;
	}

	@PostMapping
	public ResponseEntity<UserResponseDTO> createUser(@RequestBody UserRequestDTO dto) {

		User user = new User();
		user.setUsername(dto.username());
		user.setPassword(dto.password());
		user.setPhoneNumber(dto.phoneNumber());

		User saved = userService.createUser(user);

		UserResponseDTO response = new UserResponseDTO(
				saved.getId(),
				saved.getUsername(),
				saved.getPhoneNumber()
		);

		return ResponseEntity.status(201).body(response);
	}

	@GetMapping("/{id}")
	public ResponseEntity<UserResponseDTO> getById(@PathVariable Long id) {

		return userService.findById(id)
				.map(user -> ResponseEntity.ok(
						new UserResponseDTO(
								user.getId(),
								user.getUsername(),
								user.getPhoneNumber()
						)
				))
				.orElse(ResponseEntity.notFound().build());
	}
}