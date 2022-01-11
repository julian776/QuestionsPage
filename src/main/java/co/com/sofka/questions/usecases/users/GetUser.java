package co.com.sofka.questions.usecases.users;


import co.com.sofka.questions.model.UserDTO;
import co.com.sofka.questions.repositories.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import reactor.core.publisher.Mono;

@Validated
@Service
public class GetUser {

    private UserRepository repository;

    public GetUser(UserRepository repository){
        this.repository = repository;
    }

    public Mono<UserDTO> apply(String id){
        return repository.findById(id);
    }
}
