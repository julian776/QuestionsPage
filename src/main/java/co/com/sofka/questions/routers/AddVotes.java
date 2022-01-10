package co.com.sofka.questions.routers;


import co.com.sofka.questions.model.VotesDTO;
import co.com.sofka.questions.repositories.VotesRepository;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import reactor.core.publisher.Mono;

@Validated
@Service
public class AddVotes {

    private final VotesRepository votesRepository;

    public AddVotes(VotesRepository votesRepository){

        this.votesRepository = votesRepository;
    }

    public Mono<VotesDTO> apply(VotesDTO votesDTO){
        return votesRepository.save(votesDTO);
    }
}
