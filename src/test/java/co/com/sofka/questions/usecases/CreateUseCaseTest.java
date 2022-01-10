package co.com.sofka.questions.usecases;

import co.com.sofka.questions.model.QuestionDTO;
import co.com.sofka.questions.repositories.QuestionRepository;
import co.com.sofka.questions.utils.MapperUtils;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.mock.mockito.MockBean;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;


import static org.junit.jupiter.api.Assertions.*;

import static org.mockito.Mockito.*;

class CreateUseCaseTest {

    @MockBean
    QuestionRepository questionRepository;

    MapperUtils mapper;

    @Test
    void createTest(){
        QuestionDTO questionDTO = new QuestionDTO("id", "userId", "xx", "cat", "pre");
        var usecase = new CreateUseCase( mapper, questionRepository);

        when(questionRepository.save(any())).thenReturn(Mono.just(mapper.mapperToQuestion("id").apply(questionDTO)));
    }
}