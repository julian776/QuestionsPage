package co.com.sofka.questions.usecases.users;

import co.com.sofka.questions.model.UserDTO;
import co.com.sofka.questions.repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class AddUserTest {

    UserRepository repository;
    AddUser usecase;

    @BeforeEach
    void setup(){
        repository = mock(UserRepository.class);
        usecase = new AddUser(repository);
    }

    @Test
    void addUserTest(){
        var userDTO = new UserDTO("addId", "xx", "yy", "email");

        when(repository.save(any())).thenReturn(Mono.just(userDTO));

        StepVerifier.create(usecase.apply(userDTO)).expectNextMatches(user -> {
            assert user.getId() == "addId";
            assert user.getApellido() == "yy";
            assert user.getEmail() == "email";
            assert user.getNombre() == "xx";
            return true;
        });
    }

}