package br.com.gustavoakira.devpesquisa.resources;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.gustavoakira.devpesquisa.dto.RecordDTO;
import br.com.gustavoakira.devpesquisa.dto.RecordInsertDTO;
import br.com.gustavoakira.devpesquisa.services.RecordService;

@RestController
@RequestMapping(value = "/records")
public class RecordResource {
	@Autowired
	private RecordService service;
	
	@PostMapping
	public ResponseEntity<RecordDTO> new_Record(@RequestBody RecordInsertDTO insertDTO){
		RecordDTO recordDTO = service.insert(insertDTO);
		return ResponseEntity.ok().body(recordDTO);
	}
	
	
}
