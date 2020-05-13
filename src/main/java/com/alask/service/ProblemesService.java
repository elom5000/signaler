package com.alask.service;

import com.alask.domain.Problemes;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link Problemes}.
 */
public interface ProblemesService {

    /**
     * Save a problemes.
     *
     * @param problemes the entity to save.
     * @return the persisted entity.
     */
    Problemes save(Problemes problemes);

    /**
     * Get all the problemes.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Problemes> findAll(Pageable pageable);

    /**
     * Get the "id" problemes.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Problemes> findOne(Long id);

    /**
     * Delete the "id" problemes.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
