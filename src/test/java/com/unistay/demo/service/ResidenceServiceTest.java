package com.unistay.demo.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.lenient;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.unistay.demo.entity.Residence;
import com.unistay.demo.entity.User;
import com.unistay.demo.repository.ResidenceRepository;
import com.unistay.demo.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.access.AccessDeniedException;

@ExtendWith(MockitoExtension.class)
class ResidenceServiceTest {

	@Mock
	private ResidenceRepository residenceRepository;

	@Mock
	private UserRepository userRepository;

	@InjectMocks
	private ResidenceServiceImpl residenceService;

	private User owner;
	private Residence residenceInput;

	@BeforeEach
	void setUp() {
		owner = new User();
		owner.setId(100L);
		owner.setUsername("owner");
		owner.setPassword("enc");
		owner.setPhoneNumber("+5511888888888");

		residenceInput = new Residence();
		residenceInput.setTitle("Cozy Studio");
		residenceInput.setDescription("Near campus");
		residenceInput.setLocation("Downtown");
		residenceInput.setPrice(new BigDecimal("1200.00"));
		residenceInput.setContactPhone("+5511777777777");
	}

	@Test
	void shouldCreateResidenceSuccessfullyWhenUserExists() {
		when(userRepository.findById(100L)).thenReturn(Optional.of(owner));
		when(residenceRepository.save(any(Residence.class))).thenAnswer(invocation -> {
			Residence r = invocation.getArgument(0);
			r.setId(1L);
			return r;
		});

		Residence result = residenceService.createResidence(residenceInput, 100L);

		assertThat(result.getId()).isEqualTo(1L);
		assertThat(result.getTitle()).isEqualTo("Cozy Studio");
		assertThat(result.getUser()).isNotNull();
		assertThat(result.getUser().getId()).isEqualTo(100L);
		verify(userRepository).findById(100L);
		verify(residenceRepository).save(any(Residence.class));
	}

	@Test
	void shouldFailToCreateResidenceWhenUserDoesNotExist() {
		when(userRepository.findById(999L)).thenReturn(Optional.empty());

		assertThatThrownBy(() -> residenceService.createResidence(residenceInput, 999L))
				.isInstanceOf(EntityNotFoundException.class);

		verify(residenceRepository, never()).save(any());
	}

	@Test
	void shouldAllowCreatingResidenceWithOptionalContactPhoneNull() {
		residenceInput.setContactPhone(null);
		when(userRepository.findById(100L)).thenReturn(Optional.of(owner));
		when(residenceRepository.save(any(Residence.class))).thenAnswer(invocation -> {
			Residence r = invocation.getArgument(0);
			r.setId(2L);
			return r;
		});

		Residence result = residenceService.createResidence(residenceInput, 100L);

		assertThat(result.getContactPhone()).isNull();
		assertThat(result.getId()).isEqualTo(2L);
	}

	@Test
	void shouldFailToCreateResidenceWhenTitleIsInvalid() {
		residenceInput.setTitle("   ");

		assertThatThrownBy(() -> residenceService.createResidence(residenceInput, 100L))
				.isInstanceOf(IllegalArgumentException.class);

		verify(userRepository, never()).findById(any());
		verify(residenceRepository, never()).save(any());
	}

	@Test
	void shouldFailToCreateResidenceWhenLocationIsInvalid() {
		residenceInput.setLocation(null);

		assertThatThrownBy(() -> residenceService.createResidence(residenceInput, 100L))
				.isInstanceOf(IllegalArgumentException.class);

		verify(userRepository, never()).findById(any());
	}

	@Test
	void shouldFailToCreateResidenceWhenPriceIsInvalid() {
		residenceInput.setPrice(null);

		assertThatThrownBy(() -> residenceService.createResidence(residenceInput, 100L))
				.isInstanceOf(IllegalArgumentException.class);

		verify(userRepository, never()).findById(any());
	}

	@Test
	void shouldFailToCreateResidenceWhenPriceIsNegative() {
		residenceInput.setPrice(new BigDecimal("-1.00"));

		assertThatThrownBy(() -> residenceService.createResidence(residenceInput, 100L))
				.isInstanceOf(IllegalArgumentException.class);

		verify(userRepository, never()).findById(any());
	}

	@Test
	void shouldReturnAllResidences() {
		Residence r1 = new Residence();
		r1.setId(1L);
		Residence r2 = new Residence();
		r2.setId(2L);
		when(residenceRepository.findAll()).thenReturn(List.of(r1, r2));

		List<Residence> all = residenceService.getAllResidences();

		assertThat(all).hasSize(2);
		assertThat(all).extracting(Residence::getId).containsExactly(1L, 2L);
		verify(residenceRepository).findAll();
	}

	@Test
	void shouldGetResidenceByIdWhenExists() {
		Residence existing = new Residence();
		existing.setId(5L);
		existing.setTitle("Apartment");
		when(residenceRepository.findById(5L)).thenReturn(Optional.of(existing));

		Optional<Residence> result = residenceService.getResidenceById(5L);

		assertThat(result).isPresent();
		assertThat(result.get().getTitle()).isEqualTo("Apartment");
	}

	@Test
	void shouldReturnEmptyWhenGetResidenceByIdDoesNotExist() {
		when(residenceRepository.findById(404L)).thenReturn(Optional.empty());

		Optional<Residence> result = residenceService.getResidenceById(404L);

		assertThat(result).isEmpty();
	}

	@Test
	void shouldUpdateResidenceWhenRequesterIsOwner() {
		Residence existing = new Residence();
		existing.setId(50L);
		existing.setTitle("Old");
		existing.setDescription("Old desc");
		existing.setLocation("Old loc");
		existing.setPrice(new BigDecimal("900"));
		existing.setUser(owner);
		when(residenceRepository.findById(50L)).thenReturn(Optional.of(existing));
		when(userRepository.findById(100L)).thenReturn(Optional.of(owner));
		when(residenceRepository.save(any(Residence.class))).thenAnswer(invocation -> invocation.getArgument(0));

		Residence updated = new Residence();
		updated.setTitle("New Title");
		updated.setDescription("New desc");
		updated.setLocation("New loc");
		updated.setPrice(new BigDecimal("1500.00"));
		updated.setContactPhone("+5511666666666");

		Residence result = residenceService.updateResidence(50L, updated, 100L);

		assertThat(result.getTitle()).isEqualTo("New Title");
		assertThat(result.getLocation()).isEqualTo("New loc");
		assertThat(result.getPrice()).isEqualTo(new BigDecimal("1500.00"));
		verify(residenceRepository).save(any(Residence.class));
	}

	@Test
	void shouldFailToUpdateResidenceWhenRequesterIsNotOwner() {
		User other = new User();
		other.setId(200L);
		Residence existing = new Residence();
		existing.setId(50L);
		existing.setUser(owner);
		when(residenceRepository.findById(50L)).thenReturn(Optional.of(existing));
		when(userRepository.findById(200L)).thenReturn(Optional.of(other));

		Residence updated = new Residence();
		updated.setTitle("Hack");

		assertThatThrownBy(() -> residenceService.updateResidence(50L, updated, 200L))
				.isInstanceOf(AccessDeniedException.class);

		verify(residenceRepository, never()).save(any());
	}

	@Test
	void shouldFailToUpdateResidenceWhenResidenceDoesNotExist() {
		when(residenceRepository.findById(77L)).thenReturn(Optional.empty());
		lenient().when(userRepository.findById(100L)).thenReturn(Optional.of(owner));

		Residence updated = new Residence();
		updated.setTitle("X");

		assertThatThrownBy(() -> residenceService.updateResidence(77L, updated, 100L))
				.isInstanceOf(EntityNotFoundException.class);

		verify(residenceRepository, never()).save(any());
	}

	@Test
	void shouldFailToUpdateResidenceWhenUserDoesNotExist() {
		Residence existing = new Residence();
		existing.setId(50L);
		existing.setUser(owner);
		when(residenceRepository.findById(50L)).thenReturn(Optional.of(existing));
		when(userRepository.findById(300L)).thenReturn(Optional.empty());

		Residence updated = new Residence();
		updated.setTitle("Y");

		assertThatThrownBy(() -> residenceService.updateResidence(50L, updated, 300L))
				.isInstanceOf(EntityNotFoundException.class);

		verify(residenceRepository, never()).save(any());
	}

	@Test
	void shouldFailToUpdateResidenceWhenUpdatedDataHasInvalidRequiredFields() {
		Residence existing = new Residence();
		existing.setId(50L);
		existing.setUser(owner);
		when(residenceRepository.findById(50L)).thenReturn(Optional.of(existing));
		when(userRepository.findById(100L)).thenReturn(Optional.of(owner));

		Residence updated = new Residence();
		updated.setTitle("");
		updated.setLocation("Loc");
		updated.setPrice(new BigDecimal("1"));

		assertThatThrownBy(() -> residenceService.updateResidence(50L, updated, 100L))
				.isInstanceOf(IllegalArgumentException.class);

		verify(residenceRepository, never()).save(any());
	}

	@Test
	void shouldDeleteResidenceWhenRequesterIsOwner() {
		Residence existing = new Residence();
		existing.setId(60L);
		existing.setUser(owner);
		when(residenceRepository.findById(60L)).thenReturn(Optional.of(existing));
		when(userRepository.findById(100L)).thenReturn(Optional.of(owner));

		residenceService.deleteResidence(60L, 100L);

		verify(residenceRepository).delete(existing);
	}

	@Test
	void shouldFailToDeleteResidenceWhenRequesterIsNotOwner() {
		User other = new User();
		other.setId(200L);
		Residence existing = new Residence();
		existing.setId(60L);
		existing.setUser(owner);
		when(residenceRepository.findById(60L)).thenReturn(Optional.of(existing));
		when(userRepository.findById(200L)).thenReturn(Optional.of(other));

		assertThatThrownBy(() -> residenceService.deleteResidence(60L, 200L)).isInstanceOf(AccessDeniedException.class);

		verify(residenceRepository, never()).delete(any());
	}

	@Test
	void shouldFailToDeleteResidenceWhenResidenceDoesNotExist() {
		when(residenceRepository.findById(61L)).thenReturn(Optional.empty());
		lenient().when(userRepository.findById(100L)).thenReturn(Optional.of(owner));

		assertThatThrownBy(() -> residenceService.deleteResidence(61L, 100L))
				.isInstanceOf(EntityNotFoundException.class);

		verify(residenceRepository, never()).delete(any());
	}

	@Test
	void shouldFailToDeleteResidenceWhenUserDoesNotExist() {
		Residence existing = new Residence();
		existing.setId(60L);
		existing.setUser(owner);
		when(residenceRepository.findById(60L)).thenReturn(Optional.of(existing));
		when(userRepository.findById(400L)).thenReturn(Optional.empty());

		assertThatThrownBy(() -> residenceService.deleteResidence(60L, 400L))
				.isInstanceOf(EntityNotFoundException.class);

		verify(residenceRepository, never()).delete(any());
	}
}
