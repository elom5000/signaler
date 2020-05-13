package com.alask.service.impl;

import com.alask.service.ProblemesService;
import com.alask.domain.Problemes;
import com.alask.repository.ProblemesRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Problemes}.
 */
@Service
@Transactional
public class ProblemesServiceImpl implements ProblemesService {

    private final Logger log = LoggerFactory.getLogger(ProblemesServiceImpl.class);

    private final ProblemesRepository problemesRepository;

    public ProblemesServiceImpl(ProblemesRepository problemesRepository) {
        this.problemesRepository = problemesRepository;
    }

    /**
     * Save a problemes.
     *
     * @param problemes the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Problemes save(Problemes problemes) {
        log.debug("Request to save Problemes : {}", problemes);
        return problemesRepository.save(problemes);
    }

    /**
     * Get all the problemes.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Problemes> findAll(Pageable pageable) {
        log.debug("Request to get all Problemes");
        return problemesRepository.findAll(pageable);
    }

    /**
     * Get one problemes by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Problemes> findOne(Long id) {
        log.debug("Request to get Problemes : {}", id);
        return problemesRepository.findById(id);
    }

    /**
     * Delete the problemes by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Problemes : {}", id);
        problemesRepository.deleteById(id);
    }
}
