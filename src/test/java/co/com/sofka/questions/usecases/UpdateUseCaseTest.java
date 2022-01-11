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

class UpdateUseCaseTest {

    private QuestionRepository repository;
    private MapperUtils mapper = new MapperUtils();
    UpdateUseCase usecase;

    @BeforeEach
    public void setup(){
        repository = mock(QuestionRepository.class);
        usecase = new UpdateUseCase(mapper, repository);
    }

    @Test
    void testToUpdate(){
        QuestionDTO questionDTO = new QuestionDTO("updateId", "userId", "UId", "tipo", "cat", "s@s.com");

        when(repository.save(any())).thenReturn(Mono.just(mapper.mapperToQuestion("updateId").apply(questionDTO)));

        StepVerifier.create(usecase.apply(questionDTO))
                .expectNextMatches(updated -> updated.equals("updateId"))
                .verifyComplete();

        verify(repository).save(any());
    }
}