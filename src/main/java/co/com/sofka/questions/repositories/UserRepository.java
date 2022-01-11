package co.com.sofka.questions.repositories;

import co.com.sofka.questions.model.UserDTO;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Mono;

public interface UserRepository extends ReactiveCrudRepository<UserDTO, String> {

    Mono<UserDTO> findById(String id);
}
