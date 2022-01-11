package co.com.sofka.questions.usecases;

import co.com.sofka.questions.model.QuestionDTO;
import co.com.sofka.questions.repositories.QuestionRepository;
import co.com.sofka.questions.utils.MapperUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

import static org.junit.jupiter.api.Assertions.*;

import static org.mockito.Mockito.*;

class CreateUseCaseTest {

    QuestionRepository repository;
    CreateUseCase createUseCase;
    MapperUtils mapper = new MapperUtils();

    @BeforeEach
    public void setup(){
        repository = mock(QuestionRepository.class);
        createUseCase = new CreateUseCase(mapper, repository);
    }

    @Test
    void createTest(){
        QuestionDTO questionDTO = new QuestionDTO("id", "userId", "xx", "cat", "pre");

        when(repository.save(any())).thenReturn(Mono.just(mapper.mapperToQuestion("id").apply(questionDTO)));

        StepVerifier.create(createUseCase.apply(questionDTO))
                .expectNextMatches(created ->  created.equals("id"))
                .verifyComplete();

        verify(repository).save(any());
    }
}