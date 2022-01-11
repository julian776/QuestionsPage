package co.com.sofka.questions.usecases.votos;

import co.com.sofka.questions.model.VotesDTO;
import co.com.sofka.questions.repositories.VotesRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import reactor.core.publisher.Flux;
import reactor.test.StepVerifier;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class GetVotesTest {

    VotesRepository repository;
    GetVotes usecase;

    @BeforeEach
    void setup(){
        repository = mock(VotesRepository.class);
        usecase = new GetVotes(repository);
    }

    @Test
    void testGetVotes(){
        var vote = new VotesDTO("xx", "xx", 0);

        when(repository.findAllByQuestionId(any())).thenReturn(Flux.just(vote));

        StepVerifier.create(usecase.apply("xx"))
                .expectNextMatches(response -> {
                        assert response.getQuestionId() == "xx";
                        assert response.getUserId() == "xx";
                        return true;
                }).verifyComplete();
    }
}