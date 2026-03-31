package com.unistay.demo.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Check;

import java.math.BigDecimal;

@Entity
@Getter
@Setter
@Table(
		name = "residences",
		indexes = {
				@Index(name = "idx_residence_location", columnList = "location")
		}
)
@Check(constraints = "price > 0")
public class Residence {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "title", nullable = false, length = 100)
	private String title;

	@Column(name = "description", length = 500)
	private String description;

	@Column(name = "location", nullable = false, length = 150)
	private String location;

	@Column(name = "price", nullable = false, precision = 10, scale = 2)
	private BigDecimal price;

	@Column(name = "contact_phone", length = 20)
	private String contactPhone;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(
			name = "user_id",
			nullable = false,
			foreignKey = @ForeignKey(name = "fk_residence_user")
	)
	private User user;

	public Residence() {
	}
}