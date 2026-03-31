package com.unistay.demo.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.unistay.demo.entity.User;
import com.unistay.demo.repository.UserRepository;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

	@Mock
	private UserRepository userRepository;

	@Mock
	private PasswordEncoder passwordEncoder;

	@InjectMocks
	private UserService userService;

	private User newUser;

	@BeforeEach
	void setUp() {
		newUser = new User();
		newUser.setUsername("alice");
		newUser.setPassword("plainSecret");
		newUser.setPhoneNumber("+5511999999999");
	}

	@Test
	void shouldCreateUserSuccessfullyWhenUsernameIsUnique() {
		when(userRepository.existsByUsername("alice")).thenReturn(false);
		when(passwordEncoder.encode("plainSecret")).thenReturn("encodedSecret");
		when(userRepository.save(any(User.class))).thenAnswer(invocation -> {
			User u = invocation.getArgument(0);
			u.setId(1L);
			return u;
		});

		User result = userService.createUser(newUser);

		assertThat(result.getId()).isEqualTo(1L);
		assertThat(result.getUsername()).isEqualTo("alice");
		assertThat(result.getPassword()).isEqualTo("encodedSecret");
		verify(userRepository).existsByUsername("alice");
		verify(passwordEncoder).encode("plainSecret");
		verify(userRepository).save(any(User.class));
	}

	@Test
	void shouldEncryptPasswordBeforeSaving() {
		when(userRepository.existsByUsername("alice")).thenReturn(false);
		when(passwordEncoder.encode("plainSecret")).thenReturn("hashedValue");
		when(userRepository.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));

		User result = userService.createUser(newUser);

		assertThat(result.getPassword()).isEqualTo("hashedValue");
		assertThat(result.getPassword()).isNotEqualTo("plainSecret");
		verify(passwordEncoder).encode(eq("plainSecret"));
	}

	@Test
	void shouldFailToCreateUserWhenUsernameIsNotUnique() {
		when(userRepository.existsByUsername("alice")).thenReturn(true);

		assertThatThrownBy(() -> userService.createUser(newUser)).isInstanceOf(IllegalArgumentException.class);

		verify(userRepository).existsByUsername("alice");
		verify(passwordEncoder, never()).encode(any());
		verify(userRepository, never()).save(any());
	}

	@Test
	void shouldFailToCreateUserWhenUsernameIsBlank() {
		newUser.setUsername("   ");

		assertThatThrownBy(() -> userService.createUser(newUser)).isInstanceOf(IllegalArgumentException.class);

		verify(passwordEncoder, never()).encode(any());
		verify(userRepository, never()).save(any());
	}

	@Test
	void shouldFailToCreateUserWhenPersistenceViolatesUniqueConstraint() {
		when(userRepository.existsByUsername("alice")).thenReturn(false);
		when(passwordEncoder.encode(any())).thenReturn("encoded");
		when(userRepository.save(any(User.class))).thenThrow(new DataIntegrityViolationException("unique username"));

		assertThatThrownBy(() -> userService.createUser(newUser)).isInstanceOf(DataIntegrityViolationException.class);

		verify(passwordEncoder).encode(any());
	}

	@Test
	void shouldLoginSuccessfullyWhenCredentialsAreValid() {
		User persisted = new User();
		persisted.setId(10L);
		persisted.setUsername("alice");
		persisted.setPassword("encodedSecret");
		persisted.setPhoneNumber("+5511999999999");
		when(userRepository.findByUsername("alice")).thenReturn(Optional.of(persisted));
		when(passwordEncoder.matches("plainSecret", "encodedSecret")).thenReturn(true);

		Optional<User> result = userService.login("alice", "plainSecret");

		assertThat(result).isPresent();
		assertThat(result.get().getUsername()).isEqualTo("alice");
		assertThat(result.get().getId()).isEqualTo(10L);
		verify(passwordEncoder).matches("plainSecret", "encodedSecret");
	}

	@Test
	void shouldFailLoginWhenUsernameDoesNotExist() {
		when(userRepository.findByUsername("unknown")).thenReturn(Optional.empty());

		Optional<User> result = userService.login("unknown", "anyPassword");

		assertThat(result).isEmpty();
		verify(passwordEncoder, never()).matches(any(), any());
	}

	@Test
	void shouldFailLoginWhenPasswordIsInvalid() {
		User persisted = new User();
		persisted.setId(10L);
		persisted.setUsername("alice");
		persisted.setPassword("encodedSecret");
		when(userRepository.findByUsername("alice")).thenReturn(Optional.of(persisted));
		when(passwordEncoder.matches("wrongPassword", "encodedSecret")).thenReturn(false);

		Optional<User> result = userService.login("alice", "wrongPassword");

		assertThat(result).isEmpty();
		verify(passwordEncoder).matches("wrongPassword", "encodedSecret");
	}

	@Test
	void shouldFindByIdWhenUserExists() {
		User persisted = new User();
		persisted.setId(42L);
		persisted.setUsername("bob");
		when(userRepository.findById(42L)).thenReturn(Optional.of(persisted));

		Optional<User> result = userService.findById(42L);

		assertThat(result).isPresent();
		assertThat(result.get().getId()).isEqualTo(42L);
		assertThat(result.get().getUsername()).isEqualTo("bob");
	}

	@Test
	void shouldReturnEmptyWhenFindByIdDoesNotExist() {
		when(userRepository.findById(99L)).thenReturn(Optional.empty());

		Optional<User> result = userService.findById(99L);

		assertThat(result).isEmpty();
	}

	@Test
	void shouldFindByUsernameWhenPresent() {
		User persisted = new User();
		persisted.setId(3L);
		persisted.setUsername("carol");
		when(userRepository.findByUsername("carol")).thenReturn(Optional.of(persisted));

		Optional<User> result = userService.findByUsername("carol");

		assertThat(result).isPresent();
		assertThat(result.get().getUsername()).isEqualTo("carol");
	}

	@Test
	void shouldReturnEmptyWhenFindByUsernameDoesNotExist() {
		when(userRepository.findByUsername("missing")).thenReturn(Optional.empty());

		Optional<User> result = userService.findByUsername("missing");

		assertThat(result).isEmpty();
	}

	@Test
	void shouldFailWhenUsernameIsNull() {
    	newUser.setUsername(null);

    	assertThatThrownBy(() -> userService.createUser(newUser))
        .isInstanceOf(IllegalArgumentException.class);
	}
}
