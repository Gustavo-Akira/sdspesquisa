package br.com.gustavoakira.devpesquisa.resources;

import java.time.Instant;
import java.util.List;

import org.springframework.data.domain.Sort.Direction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
	
	@GetMapping
	public ResponseEntity<Page<RecordDTO>> findAll(
			@RequestParam(value = "min",defaultValue = "") String min,
			@RequestParam(value = "max",defaultValue = "") String max,
			@RequestParam(value = "page", defaultValue = "0") Integer page,
			@RequestParam(value = "linesPerPage", defaultValue = "12") Integer linesPerPage,
			@RequestParam(value = "orderBy", defaultValue = "moment") String orderBy,
			@RequestParam(value = "direction", defaultValue = "DESC") String direction
	){
		Instant minDate = ("".equals(min)) ?null : Instant.parse(min);
		Instant maxDate = ("".equals(max)) ?null : Instant.parse(max);
		
		if(linesPerPage == 0){
			linesPerPage = Integer.MAX_VALUE;
		}
		PageRequest pageRequest = PageRequest.of(page, linesPerPage,Direction.valueOf(direction),orderBy);
		Page<RecordDTO> list = service.findByMoment(minDate, maxDate, pageRequest);
		return ResponseEntity.ok().body(list);
	}
}
