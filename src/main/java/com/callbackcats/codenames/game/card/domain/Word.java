package com.callbackcats.codenames.game.card.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "word")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Word {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String word;

    @OneToOne(mappedBy = "word")
    private Card card;

    @Enumerated(EnumType.STRING)
    private GameLanguage language;

    public Word(String word, GameLanguage gameLanguage) {
        this.word = word;
        this.language = gameLanguage;
    }
}