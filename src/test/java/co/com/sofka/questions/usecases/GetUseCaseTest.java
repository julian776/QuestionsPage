package co.com.sofka.questions.usecases;

import co.com.sofka.questions.collections.Answer;
import co.com.sofka.questions.model.AnswerDTO;
import co.com.sofka.questions.model.QuestionDTO;
import co.com.sofka.questions.repositories.AnswerRepository;
import co.com.sofka.questions.repositories.QuestionRepository;
import co.com.sofka.questions.utils.MapperUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static reactor.core.publisher.Mono.when;

class GetUseCaseTest {

    private QuestionRepository questionRepository;
    private AnswerRepository answerRepository;
    private MapperUtils mapper = new MapperUtils();
    private GetUseCase usecase;

    @BeforeEach
    void setup(){
        questionRepository = mock(QuestionRepository.class);
        answerRepository = mock(AnswerRepository.class);
        usecase = new GetUseCase(mapper, questionRepository, answerRepository);
    }

    @Test
    void testGet(){
        QuestionDTO questionDTO = new QuestionDTO("userId", "UId", "tipo", "cat", "s@s.com");
        questionDTO.setAnswers(new ArrayList<>());
        AnswerDTO answerDTO = new AnswerDTO("getId", "userXX", "No");
        Flux<Answer> allAnswers = Flux.create(fluxSink -> {
                fluxSink.next(mapper.mapperToAnswer().apply(answerDTO));
                fluxSink.complete();
    });

        when(answerRepository.findAllByQuestionId(any())).thenReturn(allAnswers);
        when(questionRepository.findById(anyString())).thenReturn(Mono.just(mapper.mapperToQuestion("getId").apply(questionDTO)));

        StepVerifier.create(usecase.apply("updateId"))
                .expectNextMatches(result -> {
                    assert result.getId() == "getId";
                    assert result.getUserId() == "userId";
                    assert result.getCategory() == "cat";
                    return true;
                })
                .verifyComplete();

        verify(answerRepository).findAllByQuestionId(any());
        verify(questionRepository).findById(anyString());
    }
}