package co.com.sofka.questions.usecases.users;

import co.com.sofka.questions.model.UserDTO;
import co.com.sofka.questions.repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class GetUserTest {

    UserRepository repository;
    GetUser usecase;

    @BeforeEach
    void setup(){
        repository = mock(UserRepository.class);
        usecase = new GetUser(repository);
    }

    @Test
    void getUserTest(){
        var userDTO = new UserDTO("Id", "xx", "yy", "email");

        when(repository.findById(anyString())).thenReturn(Mono.just(userDTO));

        StepVerifier.create(usecase.apply("xx")).expectNextMatches(user -> {
            assert user.getId() == "Id";
            assert user.getApellido() == "yy";
            return true;
        });
    }
}