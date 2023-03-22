package com.example.springstomp.controller;

import com.example.springstomp.message.Color;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.util.HtmlUtils;

@Controller
public class WSController {

    @Autowired
    SimpMessagingTemplate template;

    @PostMapping("/color")
    public ResponseEntity<Color> sendMessage(@RequestBody Color color) throws Exception{
        template.convertAndSend("/topic/color", color);
        return new ResponseEntity<Color>(color, HttpStatus.OK);
    }


    @SendTo("/topic/color")
    public Color publishColor(@Payload Color color) throws Exception{
        Thread.sleep(1000);
        return color;
    }

}
