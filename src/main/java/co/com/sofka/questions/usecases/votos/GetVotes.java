package co.com.sofka.questions.usecases.votos;

import co.com.sofka.questions.model.VotesDTO;
import co.com.sofka.questions.repositories.VotesRepository;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import reactor.core.publisher.Flux;

@Service
@Validated
public class GetVotes {

    private final VotesRepository votesRepository;

    public GetVotes(VotesRepository votesRepository){

        this.votesRepository = votesRepository;
    }

    public Flux<VotesDTO> apply(String id){
        return votesRepository.findAllByQuestionId(id);
    }
}
