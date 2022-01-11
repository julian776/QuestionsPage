package co.com.sofka.questions.model;

import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotBlank;

@Document(collection = "votes")
public class VotesDTO {

    @NotBlank
    private String questionId;
    @NotBlank
    private String userId;
    @NotBlank
    private Integer voto;

    public VotesDTO(String questionId, String userId, Integer voto){

        this.questionId = questionId;
        this.userId = userId;
        this.voto = voto;
    }

    public VotesDTO(){

    }

    public String getQuestionId() {
        return questionId;
    }

    public void setQuestionId(String questionId) {
        this.questionId = questionId;
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
