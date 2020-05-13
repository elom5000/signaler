package com.alask.repository;

import com.alask.domain.Problemes;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Problemes entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProblemesRepository extends JpaRepository<Problemes, Long> {
}
