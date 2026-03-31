package com.unistay.demo.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "users")
public class User implements UserDetails {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "username", nullable = false, unique = true, length = 50)
	private String username;

	@Column(name = "password", nullable = false, length = 255)
	private String password;

	@Column(name = "phone_number", length = 20)
	private String phoneNumber;

	public User() {}

	@Override
	public Collection getAuthorities() {
		return List.of(); // sem roles por enquanto
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public String getUsername() {
		return username;
	}
}