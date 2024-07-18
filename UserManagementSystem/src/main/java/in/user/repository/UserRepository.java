package in.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import in.user.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
}
