package br.com.gustavoakira.devpesquisa.services;

import java.time.Instant;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.gustavoakira.devpesquisa.dto.RecordDTO;
import br.com.gustavoakira.devpesquisa.dto.RecordInsertDTO;
import br.com.gustavoakira.devpesquisa.entities.Game;
import br.com.gustavoakira.devpesquisa.entities.Record;
import br.com.gustavoakira.devpesquisa.repositories.GameRepository;
import br.com.gustavoakira.devpesquisa.repositories.RecordRepository;

@Service
public class RecordService {
	
	@Autowired
	private RecordRepository repository;
	
	@Autowired
	private GameRepository gameRepository;
	
	@Transactional
	public RecordDTO insert(RecordInsertDTO dto) {
		Record entity = new Record();
		entity.setName(dto.getName());
		entity.setAge(dto.getAge());
		entity.setMoment(Instant.now());
		Game game = gameRepository.getOne(dto.getGameId());
		entity.setGame(game);
		entity = repository.save(entity);
		return new RecordDTO(entity);
	}
}
