package br.com.gustavoakira.devpesquisa.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.gustavoakira.devpesquisa.entities.Genre;

public interface GenreRepository extends JpaRepository<Genre, Long>{

}
