package br.com.gustavoakira.devpesquisa.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.gustavoakira.devpesquisa.entities.Game;

public interface RecordRepository extends JpaRepository<Game, Long>{

}
