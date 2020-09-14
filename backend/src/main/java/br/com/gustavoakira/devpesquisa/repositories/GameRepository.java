package br.com.gustavoakira.devpesquisa.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.gustavoakira.devpesquisa.entities.Record;

public interface GameRepository extends JpaRepository<Record, Long>{

}
