package co.com.sofka.questions.repositories;

import co.com.sofka.questions.model.VotesDTO;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

@Repository
public interface VotesRepository extends ReactiveCrudRepository<VotesDTO, String> {
    Flux<VotesDTO> findAllByQuestionId(String id);
}
