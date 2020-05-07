package com.callbackcats.codenames.lobby.repository;

import com.callbackcats.codenames.lobby.domain.Lobby;
import com.callbackcats.codenames.player.domain.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LobbyRepository extends JpaRepository<Lobby, String> {

    @Query("select  l from Lobby l where l.playerList.size>0")
    List<Lobby> getLobbiesWithPlayers();

    @Query("select l from Lobby l where l.id= :lobbyId")
    Lobby findLobbyByName(@Param("lobbyId") String lobbyId);
}
