package com.callbackcats.codenames.lobby.controller;

import com.callbackcats.codenames.lobby.domain.Lobby;
import com.callbackcats.codenames.lobby.dto.LobbyDetails;
import com.callbackcats.codenames.lobby.repository.LobbyRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/lobby")
@Slf4j
public class LobbyController {

    private LobbyRepository lobbyRepository;

    public LobbyController(LobbyRepository lobbyRepository) {
        this.lobbyRepository = lobbyRepository;
    }

    @GetMapping
    public ResponseEntity<LobbyDetails> getNewLobby() {
        Lobby lobby = new Lobby();
        this.lobbyRepository.save(lobby);
        LobbyDetails lobbyDetails = new LobbyDetails(lobby);
        log.info("New lobby generation requested");
        return new ResponseEntity<>(lobbyDetails, HttpStatus.OK);
    }

}