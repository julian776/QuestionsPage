package co.com.sofka.questions.usecases.users;

import co.com.sofka.questions.model.UserDTO;
import co.com.sofka.questions.repositories.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import reactor.core.publisher.Mono;

@Validated
@Service
public class AddUser {

    private final UserRepository repository;

    public AddUser(UserRepository repository){

        this.repository = repository;
    }

    public Mono<UserDTO> apply(UserDTO user){
        return repository.save(user);
    }
}
