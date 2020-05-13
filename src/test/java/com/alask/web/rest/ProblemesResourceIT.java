package com.alask.web.rest;

import com.alask.SignalerApp;
import com.alask.domain.Problemes;
import com.alask.repository.ProblemesRepository;
import com.alask.service.ProblemesService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ProblemesResource} REST controller.
 */
@SpringBootTest(classes = SignalerApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class ProblemesResourceIT {

    private static final String DEFAULT_LIBELLE = "AAAAAAAAAA";
    private static final String UPDATED_LIBELLE = "BBBBBBBBBB";

    private static final String DEFAULT_NUMERO_IP = "AAAAAAAAAA";
    private static final String UPDATED_NUMERO_IP = "BBBBBBBBBB";

    @Autowired
    private ProblemesRepository problemesRepository;

    @Autowired
    private ProblemesService problemesService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restProblemesMockMvc;

    private Problemes problemes;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Problemes createEntity(EntityManager em) {
        Problemes problemes = new Problemes()
            .libelle(DEFAULT_LIBELLE)
            .numeroIp(DEFAULT_NUMERO_IP);
        return problemes;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Problemes createUpdatedEntity(EntityManager em) {
        Problemes problemes = new Problemes()
            .libelle(UPDATED_LIBELLE)
            .numeroIp(UPDATED_NUMERO_IP);
        return problemes;
    }

    @BeforeEach
    public void initTest() {
        problemes = createEntity(em);
    }

    @Test
    @Transactional
    public void createProblemes() throws Exception {
        int databaseSizeBeforeCreate = problemesRepository.findAll().size();

        // Create the Problemes
        restProblemesMockMvc.perform(post("/api/problemes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(problemes)))
            .andExpect(status().isCreated());

        // Validate the Problemes in the database
        List<Problemes> problemesList = problemesRepository.findAll();
        assertThat(problemesList).hasSize(databaseSizeBeforeCreate + 1);
        Problemes testProblemes = problemesList.get(problemesList.size() - 1);
        assertThat(testProblemes.getLibelle()).isEqualTo(DEFAULT_LIBELLE);
        assertThat(testProblemes.getNumeroIp()).isEqualTo(DEFAULT_NUMERO_IP);
    }

    @Test
    @Transactional
    public void createProblemesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = problemesRepository.findAll().size();

        // Create the Problemes with an existing ID
        problemes.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProblemesMockMvc.perform(post("/api/problemes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(problemes)))
            .andExpect(status().isBadRequest());

        // Validate the Problemes in the database
        List<Problemes> problemesList = problemesRepository.findAll();
        assertThat(problemesList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkLibelleIsRequired() throws Exception {
        int databaseSizeBeforeTest = problemesRepository.findAll().size();
        // set the field null
        problemes.setLibelle(null);

        // Create the Problemes, which fails.

        restProblemesMockMvc.perform(post("/api/problemes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(problemes)))
            .andExpect(status().isBadRequest());

        List<Problemes> problemesList = problemesRepository.findAll();
        assertThat(problemesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNumeroIpIsRequired() throws Exception {
        int databaseSizeBeforeTest = problemesRepository.findAll().size();
        // set the field null
        problemes.setNumeroIp(null);

        // Create the Problemes, which fails.

        restProblemesMockMvc.perform(post("/api/problemes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(problemes)))
            .andExpect(status().isBadRequest());

        List<Problemes> problemesList = problemesRepository.findAll();
        assertThat(problemesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllProblemes() throws Exception {
        // Initialize the database
        problemesRepository.saveAndFlush(problemes);

        // Get all the problemesList
        restProblemesMockMvc.perform(get("/api/problemes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(problemes.getId().intValue())))
            .andExpect(jsonPath("$.[*].libelle").value(hasItem(DEFAULT_LIBELLE)))
            .andExpect(jsonPath("$.[*].numeroIp").value(hasItem(DEFAULT_NUMERO_IP)));
    }
    
    @Test
    @Transactional
    public void getProblemes() throws Exception {
        // Initialize the database
        problemesRepository.saveAndFlush(problemes);

        // Get the problemes
        restProblemesMockMvc.perform(get("/api/problemes/{id}", problemes.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(problemes.getId().intValue()))
            .andExpect(jsonPath("$.libelle").value(DEFAULT_LIBELLE))
            .andExpect(jsonPath("$.numeroIp").value(DEFAULT_NUMERO_IP));
    }

    @Test
    @Transactional
    public void getNonExistingProblemes() throws Exception {
        // Get the problemes
        restProblemesMockMvc.perform(get("/api/problemes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProblemes() throws Exception {
        // Initialize the database
        problemesService.save(problemes);

        int databaseSizeBeforeUpdate = problemesRepository.findAll().size();

        // Update the problemes
        Problemes updatedProblemes = problemesRepository.findById(problemes.getId()).get();
        // Disconnect from session so that the updates on updatedProblemes are not directly saved in db
        em.detach(updatedProblemes);
        updatedProblemes
            .libelle(UPDATED_LIBELLE)
            .numeroIp(UPDATED_NUMERO_IP);

        restProblemesMockMvc.perform(put("/api/problemes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedProblemes)))
            .andExpect(status().isOk());

        // Validate the Problemes in the database
        List<Problemes> problemesList = problemesRepository.findAll();
        assertThat(problemesList).hasSize(databaseSizeBeforeUpdate);
        Problemes testProblemes = problemesList.get(problemesList.size() - 1);
        assertThat(testProblemes.getLibelle()).isEqualTo(UPDATED_LIBELLE);
        assertThat(testProblemes.getNumeroIp()).isEqualTo(UPDATED_NUMERO_IP);
    }

    @Test
    @Transactional
    public void updateNonExistingProblemes() throws Exception {
        int databaseSizeBeforeUpdate = problemesRepository.findAll().size();

        // Create the Problemes

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProblemesMockMvc.perform(put("/api/problemes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(problemes)))
            .andExpect(status().isBadRequest());

        // Validate the Problemes in the database
        List<Problemes> problemesList = problemesRepository.findAll();
        assertThat(problemesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProblemes() throws Exception {
        // Initialize the database
        problemesService.save(problemes);

        int databaseSizeBeforeDelete = problemesRepository.findAll().size();

        // Delete the problemes
        restProblemesMockMvc.perform(delete("/api/problemes/{id}", problemes.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Problemes> problemesList = problemesRepository.findAll();
        assertThat(problemesList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
