package co.com.sofka.questions.model;

import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotBlank;

@Document(collection = "votes")
public class VotesDTO {

    @NotBlank
    private String id;
    @NotBlank
    private String userId;
    @NotBlank
    private Integer voto;

    public VotesDTO(String id, String userId, Integer voto){

        this.id = id;
        this.userId = userId;
        this.voto = voto;
    }

    public VotesDTO(){

    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Integer getVoto() {
        return voto;
    }

    public void setVoto(Integer voto) {
        this.voto = voto;
    }
}
