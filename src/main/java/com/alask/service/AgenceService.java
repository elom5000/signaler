package com.alask.service;

import com.alask.domain.Agence;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Agence}.
 */
public interface AgenceService {

    /**
     * Save a agence.
     *
     * @param agence the entity to save.
     * @return the persisted entity.
     */
    Agence save(Agence agence);

    /**
     * Get all the agences.
     *
     * @return the list of entities.
     */
    List<Agence> findAll();

    /**
     * Get the "id" agence.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Agence> findOne(Long id);

    /**
     * Delete the "id" agence.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
