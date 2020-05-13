package com.alask.web.rest;

import com.alask.domain.Problemes;
import com.alask.service.ProblemesService;
import com.alask.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.alask.domain.Problemes}.
 */
@RestController
@RequestMapping("/api")
public class ProblemesResource {

    private final Logger log = LoggerFactory.getLogger(ProblemesResource.class);

    private static final String ENTITY_NAME = "problemes";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProblemesService problemesService;

    public ProblemesResource(ProblemesService problemesService) {
        this.problemesService = problemesService;
    }

    /**
     * {@code POST  /problemes} : Create a new problemes.
     *
     * @param problemes the problemes to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new problemes, or with status {@code 400 (Bad Request)} if the problemes has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/problemes")
    public ResponseEntity<Problemes> createProblemes(@Valid @RequestBody Problemes problemes) throws URISyntaxException {
        log.debug("REST request to save Problemes : {}", problemes);
        if (problemes.getId() != null) {
            throw new BadRequestAlertException("A new problemes cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Problemes result = problemesService.save(problemes);
        return ResponseEntity.created(new URI("/api/problemes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /problemes} : Updates an existing problemes.
     *
     * @param problemes the problemes to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated problemes,
     * or with status {@code 400 (Bad Request)} if the problemes is not valid,
     * or with status {@code 500 (Internal Server Error)} if the problemes couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/problemes")
    public ResponseEntity<Problemes> updateProblemes(@Valid @RequestBody Problemes problemes) throws URISyntaxException {
        log.debug("REST request to update Problemes : {}", problemes);
        if (problemes.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Problemes result = problemesService.save(problemes);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, problemes.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /problemes} : get all the problemes.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of problemes in body.
     */
    @GetMapping("/problemes")
    public ResponseEntity<List<Problemes>> getAllProblemes(Pageable pageable) {
        log.debug("REST request to get a page of Problemes");
        Page<Problemes> page = problemesService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /problemes/:id} : get the "id" problemes.
     *
     * @param id the id of the problemes to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the problemes, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/problemes/{id}")
    public ResponseEntity<Problemes> getProblemes(@PathVariable Long id) {
        log.debug("REST request to get Problemes : {}", id);
        Optional<Problemes> problemes = problemesService.findOne(id);
        return ResponseUtil.wrapOrNotFound(problemes);
    }

    /**
     * {@code DELETE  /problemes/:id} : delete the "id" problemes.
     *
     * @param id the id of the problemes to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/problemes/{id}")
    public ResponseEntity<Void> deleteProblemes(@PathVariable Long id) {
        log.debug("REST request to delete Problemes : {}", id);
        problemesService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
