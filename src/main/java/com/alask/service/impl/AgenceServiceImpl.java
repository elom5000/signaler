package com.alask.service.impl;

import com.alask.service.AgenceService;
import com.alask.domain.Agence;
import com.alask.repository.AgenceRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Agence}.
 */
@Service
@Transactional
public class AgenceServiceImpl implements AgenceService {

    private final Logger log = LoggerFactory.getLogger(AgenceServiceImpl.class);

    private final AgenceRepository agenceRepository;

    public AgenceServiceImpl(AgenceRepository agenceRepository) {
        this.agenceRepository = agenceRepository;
    }

    /**
     * Save a agence.
     *
     * @param agence the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Agence save(Agence agence) {
        log.debug("Request to save Agence : {}", agence);
        return agenceRepository.save(agence);
    }

    /**
     * Get all the agences.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<Agence> findAll() {
        log.debug("Request to get all Agences");
        return agenceRepository.findAll();
    }

    /**
     * Get one agence by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Agence> findOne(Long id) {
        log.debug("Request to get Agence : {}", id);
        return agenceRepository.findById(id);
    }

    /**
     * Delete the agence by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Agence : {}", id);
        agenceRepository.deleteById(id);
    }
}
