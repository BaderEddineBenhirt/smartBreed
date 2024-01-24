package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.Ferme;
import com.mycompany.myapp.repository.FermeRepository;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link FermeResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class FermeResourceIT {

    private static final String DEFAULT_ADRESSE = "AAAAAAAAAA";
    private static final String UPDATED_ADRESSE = "BBBBBBBBBB";

    private static final Integer DEFAULT_TAILLE = 1;
    private static final Integer UPDATED_TAILLE = 2;

    private static final String ENTITY_API_URL = "/api/fermes";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private FermeRepository fermeRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restFermeMockMvc;

    private Ferme ferme;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Ferme createEntity(EntityManager em) {
        Ferme ferme = new Ferme().adresse(DEFAULT_ADRESSE).taille(DEFAULT_TAILLE);
        return ferme;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Ferme createUpdatedEntity(EntityManager em) {
        Ferme ferme = new Ferme().adresse(UPDATED_ADRESSE).taille(UPDATED_TAILLE);
        return ferme;
    }

    @BeforeEach
    public void initTest() {
        ferme = createEntity(em);
    }

    @Test
    @Transactional
    void createFerme() throws Exception {
        int databaseSizeBeforeCreate = fermeRepository.findAll().size();
        // Create the Ferme
        restFermeMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(ferme)))
            .andExpect(status().isCreated());

        // Validate the Ferme in the database
        List<Ferme> fermeList = fermeRepository.findAll();
        assertThat(fermeList).hasSize(databaseSizeBeforeCreate + 1);
        Ferme testFerme = fermeList.get(fermeList.size() - 1);
        assertThat(testFerme.getAdresse()).isEqualTo(DEFAULT_ADRESSE);
        assertThat(testFerme.getTaille()).isEqualTo(DEFAULT_TAILLE);
    }

    @Test
    @Transactional
    void createFermeWithExistingId() throws Exception {
        // Create the Ferme with an existing ID
        ferme.setId(1L);

        int databaseSizeBeforeCreate = fermeRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restFermeMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(ferme)))
            .andExpect(status().isBadRequest());

        // Validate the Ferme in the database
        List<Ferme> fermeList = fermeRepository.findAll();
        assertThat(fermeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllFermes() throws Exception {
        // Initialize the database
        fermeRepository.saveAndFlush(ferme);

        // Get all the fermeList
        restFermeMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ferme.getId().intValue())))
            .andExpect(jsonPath("$.[*].adresse").value(hasItem(DEFAULT_ADRESSE)))
            .andExpect(jsonPath("$.[*].taille").value(hasItem(DEFAULT_TAILLE)));
    }

    @Test
    @Transactional
    void getFerme() throws Exception {
        // Initialize the database
        fermeRepository.saveAndFlush(ferme);

        // Get the ferme
        restFermeMockMvc
            .perform(get(ENTITY_API_URL_ID, ferme.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(ferme.getId().intValue()))
            .andExpect(jsonPath("$.adresse").value(DEFAULT_ADRESSE))
            .andExpect(jsonPath("$.taille").value(DEFAULT_TAILLE));
    }

    @Test
    @Transactional
    void getNonExistingFerme() throws Exception {
        // Get the ferme
        restFermeMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingFerme() throws Exception {
        // Initialize the database
        fermeRepository.saveAndFlush(ferme);

        int databaseSizeBeforeUpdate = fermeRepository.findAll().size();

        // Update the ferme
        Ferme updatedFerme = fermeRepository.findById(ferme.getId()).get();
        // Disconnect from session so that the updates on updatedFerme are not directly saved in db
        em.detach(updatedFerme);
        updatedFerme.adresse(UPDATED_ADRESSE).taille(UPDATED_TAILLE);

        restFermeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedFerme.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedFerme))
            )
            .andExpect(status().isOk());

        // Validate the Ferme in the database
        List<Ferme> fermeList = fermeRepository.findAll();
        assertThat(fermeList).hasSize(databaseSizeBeforeUpdate);
        Ferme testFerme = fermeList.get(fermeList.size() - 1);
        assertThat(testFerme.getAdresse()).isEqualTo(UPDATED_ADRESSE);
        assertThat(testFerme.getTaille()).isEqualTo(UPDATED_TAILLE);
    }

    @Test
    @Transactional
    void putNonExistingFerme() throws Exception {
        int databaseSizeBeforeUpdate = fermeRepository.findAll().size();
        ferme.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFermeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, ferme.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(ferme))
            )
            .andExpect(status().isBadRequest());

        // Validate the Ferme in the database
        List<Ferme> fermeList = fermeRepository.findAll();
        assertThat(fermeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchFerme() throws Exception {
        int databaseSizeBeforeUpdate = fermeRepository.findAll().size();
        ferme.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restFermeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(ferme))
            )
            .andExpect(status().isBadRequest());

        // Validate the Ferme in the database
        List<Ferme> fermeList = fermeRepository.findAll();
        assertThat(fermeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamFerme() throws Exception {
        int databaseSizeBeforeUpdate = fermeRepository.findAll().size();
        ferme.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restFermeMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(ferme)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Ferme in the database
        List<Ferme> fermeList = fermeRepository.findAll();
        assertThat(fermeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateFermeWithPatch() throws Exception {
        // Initialize the database
        fermeRepository.saveAndFlush(ferme);

        int databaseSizeBeforeUpdate = fermeRepository.findAll().size();

        // Update the ferme using partial update
        Ferme partialUpdatedFerme = new Ferme();
        partialUpdatedFerme.setId(ferme.getId());

        restFermeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedFerme.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedFerme))
            )
            .andExpect(status().isOk());

        // Validate the Ferme in the database
        List<Ferme> fermeList = fermeRepository.findAll();
        assertThat(fermeList).hasSize(databaseSizeBeforeUpdate);
        Ferme testFerme = fermeList.get(fermeList.size() - 1);
        assertThat(testFerme.getAdresse()).isEqualTo(DEFAULT_ADRESSE);
        assertThat(testFerme.getTaille()).isEqualTo(DEFAULT_TAILLE);
    }

    @Test
    @Transactional
    void fullUpdateFermeWithPatch() throws Exception {
        // Initialize the database
        fermeRepository.saveAndFlush(ferme);

        int databaseSizeBeforeUpdate = fermeRepository.findAll().size();

        // Update the ferme using partial update
        Ferme partialUpdatedFerme = new Ferme();
        partialUpdatedFerme.setId(ferme.getId());

        partialUpdatedFerme.adresse(UPDATED_ADRESSE).taille(UPDATED_TAILLE);

        restFermeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedFerme.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedFerme))
            )
            .andExpect(status().isOk());

        // Validate the Ferme in the database
        List<Ferme> fermeList = fermeRepository.findAll();
        assertThat(fermeList).hasSize(databaseSizeBeforeUpdate);
        Ferme testFerme = fermeList.get(fermeList.size() - 1);
        assertThat(testFerme.getAdresse()).isEqualTo(UPDATED_ADRESSE);
        assertThat(testFerme.getTaille()).isEqualTo(UPDATED_TAILLE);
    }

    @Test
    @Transactional
    void patchNonExistingFerme() throws Exception {
        int databaseSizeBeforeUpdate = fermeRepository.findAll().size();
        ferme.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFermeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, ferme.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(ferme))
            )
            .andExpect(status().isBadRequest());

        // Validate the Ferme in the database
        List<Ferme> fermeList = fermeRepository.findAll();
        assertThat(fermeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchFerme() throws Exception {
        int databaseSizeBeforeUpdate = fermeRepository.findAll().size();
        ferme.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restFermeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(ferme))
            )
            .andExpect(status().isBadRequest());

        // Validate the Ferme in the database
        List<Ferme> fermeList = fermeRepository.findAll();
        assertThat(fermeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamFerme() throws Exception {
        int databaseSizeBeforeUpdate = fermeRepository.findAll().size();
        ferme.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restFermeMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(ferme)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Ferme in the database
        List<Ferme> fermeList = fermeRepository.findAll();
        assertThat(fermeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteFerme() throws Exception {
        // Initialize the database
        fermeRepository.saveAndFlush(ferme);

        int databaseSizeBeforeDelete = fermeRepository.findAll().size();

        // Delete the ferme
        restFermeMockMvc
            .perform(delete(ENTITY_API_URL_ID, ferme.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Ferme> fermeList = fermeRepository.findAll();
        assertThat(fermeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
