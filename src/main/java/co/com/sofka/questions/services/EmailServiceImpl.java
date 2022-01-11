package co.com.sofka.questions.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.Properties;

@Component
@Service
public class EmailServiceImpl {

    @Autowired
    private JavaMailSender javaMailSender;

    public String sendEmail(String userToSend) {

        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(userToSend);

        msg.setSubject("Te han dado respuesta");
        msg.setText("Ve y revisa tus preguntas \n https://questions-fcd8c.web.app");

        javaMailSender.send(msg);
        return "Succesful sended";
    }
}
