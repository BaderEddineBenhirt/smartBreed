package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.Maladie;
import com.mycompany.myapp.repository.MaladieRepository;
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
 * Integration tests for the {@link MaladieResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class MaladieResourceIT {

    private static final String DEFAULT_NOM_MALADIE = "AAAAAAAAAA";
    private static final String UPDATED_NOM_MALADIE = "BBBBBBBBBB";

    private static final String DEFAULT_SYMPTOMES = "AAAAAAAAAA";
    private static final String UPDATED_SYMPTOMES = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/maladies";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private MaladieRepository maladieRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMaladieMockMvc;

    private Maladie maladie;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Maladie createEntity(EntityManager em) {
        Maladie maladie = new Maladie().nomMaladie(DEFAULT_NOM_MALADIE).symptomes(DEFAULT_SYMPTOMES);
        return maladie;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Maladie createUpdatedEntity(EntityManager em) {
        Maladie maladie = new Maladie().nomMaladie(UPDATED_NOM_MALADIE).symptomes(UPDATED_SYMPTOMES);
        return maladie;
    }

    @BeforeEach
    public void initTest() {
        maladie = createEntity(em);
    }

    @Test
    @Transactional
    void createMaladie() throws Exception {
        int databaseSizeBeforeCreate = maladieRepository.findAll().size();
        // Create the Maladie
        restMaladieMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(maladie)))
            .andExpect(status().isCreated());

        // Validate the Maladie in the database
        List<Maladie> maladieList = maladieRepository.findAll();
        assertThat(maladieList).hasSize(databaseSizeBeforeCreate + 1);
        Maladie testMaladie = maladieList.get(maladieList.size() - 1);
        assertThat(testMaladie.getNomMaladie()).isEqualTo(DEFAULT_NOM_MALADIE);
        assertThat(testMaladie.getSymptomes()).isEqualTo(DEFAULT_SYMPTOMES);
    }

    @Test
    @Transactional
    void createMaladieWithExistingId() throws Exception {
        // Create the Maladie with an existing ID
        maladie.setId(1L);

        int databaseSizeBeforeCreate = maladieRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restMaladieMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(maladie)))
            .andExpect(status().isBadRequest());

        // Validate the Maladie in the database
        List<Maladie> maladieList = maladieRepository.findAll();
        assertThat(maladieList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllMaladies() throws Exception {
        // Initialize the database
        maladieRepository.saveAndFlush(maladie);

        // Get all the maladieList
        restMaladieMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(maladie.getId().intValue())))
            .andExpect(jsonPath("$.[*].nomMaladie").value(hasItem(DEFAULT_NOM_MALADIE)))
            .andExpect(jsonPath("$.[*].symptomes").value(hasItem(DEFAULT_SYMPTOMES)));
    }

    @Test
    @Transactional
    void getMaladie() throws Exception {
        // Initialize the database
        maladieRepository.saveAndFlush(maladie);

        // Get the maladie
        restMaladieMockMvc
            .perform(get(ENTITY_API_URL_ID, maladie.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(maladie.getId().intValue()))
            .andExpect(jsonPath("$.nomMaladie").value(DEFAULT_NOM_MALADIE))
            .andExpect(jsonPath("$.symptomes").value(DEFAULT_SYMPTOMES));
    }

    @Test
    @Transactional
    void getNonExistingMaladie() throws Exception {
        // Get the maladie
        restMaladieMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingMaladie() throws Exception {
        // Initialize the database
        maladieRepository.saveAndFlush(maladie);

        int databaseSizeBeforeUpdate = maladieRepository.findAll().size();

        // Update the maladie
        Maladie updatedMaladie = maladieRepository.findById(maladie.getId()).get();
        // Disconnect from session so that the updates on updatedMaladie are not directly saved in db
        em.detach(updatedMaladie);
        updatedMaladie.nomMaladie(UPDATED_NOM_MALADIE).symptomes(UPDATED_SYMPTOMES);

        restMaladieMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedMaladie.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedMaladie))
            )
            .andExpect(status().isOk());

        // Validate the Maladie in the database
        List<Maladie> maladieList = maladieRepository.findAll();
        assertThat(maladieList).hasSize(databaseSizeBeforeUpdate);
        Maladie testMaladie = maladieList.get(maladieList.size() - 1);
        assertThat(testMaladie.getNomMaladie()).isEqualTo(UPDATED_NOM_MALADIE);
        assertThat(testMaladie.getSymptomes()).isEqualTo(UPDATED_SYMPTOMES);
    }

    @Test
    @Transactional
    void putNonExistingMaladie() throws Exception {
        int databaseSizeBeforeUpdate = maladieRepository.findAll().size();
        maladie.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMaladieMockMvc
            .perform(
                put(ENTITY_API_URL_ID, maladie.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(maladie))
            )
            .andExpect(status().isBadRequest());

        // Validate the Maladie in the database
        List<Maladie> maladieList = maladieRepository.findAll();
        assertThat(maladieList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchMaladie() throws Exception {
        int databaseSizeBeforeUpdate = maladieRepository.findAll().size();
        maladie.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMaladieMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(maladie))
            )
            .andExpect(status().isBadRequest());

        // Validate the Maladie in the database
        List<Maladie> maladieList = maladieRepository.findAll();
        assertThat(maladieList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamMaladie() throws Exception {
        int databaseSizeBeforeUpdate = maladieRepository.findAll().size();
        maladie.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMaladieMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(maladie)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Maladie in the database
        List<Maladie> maladieList = maladieRepository.findAll();
        assertThat(maladieList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateMaladieWithPatch() throws Exception {
        // Initialize the database
        maladieRepository.saveAndFlush(maladie);

        int databaseSizeBeforeUpdate = maladieRepository.findAll().size();

        // Update the maladie using partial update
        Maladie partialUpdatedMaladie = new Maladie();
        partialUpdatedMaladie.setId(maladie.getId());

        restMaladieMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedMaladie.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedMaladie))
            )
            .andExpect(status().isOk());

        // Validate the Maladie in the database
        List<Maladie> maladieList = maladieRepository.findAll();
        assertThat(maladieList).hasSize(databaseSizeBeforeUpdate);
        Maladie testMaladie = maladieList.get(maladieList.size() - 1);
        assertThat(testMaladie.getNomMaladie()).isEqualTo(DEFAULT_NOM_MALADIE);
        assertThat(testMaladie.getSymptomes()).isEqualTo(DEFAULT_SYMPTOMES);
    }

    @Test
    @Transactional
    void fullUpdateMaladieWithPatch() throws Exception {
        // Initialize the database
        maladieRepository.saveAndFlush(maladie);

        int databaseSizeBeforeUpdate = maladieRepository.findAll().size();

        // Update the maladie using partial update
        Maladie partialUpdatedMaladie = new Maladie();
        partialUpdatedMaladie.setId(maladie.getId());

        partialUpdatedMaladie.nomMaladie(UPDATED_NOM_MALADIE).symptomes(UPDATED_SYMPTOMES);

        restMaladieMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedMaladie.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedMaladie))
            )
            .andExpect(status().isOk());

        // Validate the Maladie in the database
        List<Maladie> maladieList = maladieRepository.findAll();
        assertThat(maladieList).hasSize(databaseSizeBeforeUpdate);
        Maladie testMaladie = maladieList.get(maladieList.size() - 1);
        assertThat(testMaladie.getNomMaladie()).isEqualTo(UPDATED_NOM_MALADIE);
        assertThat(testMaladie.getSymptomes()).isEqualTo(UPDATED_SYMPTOMES);
    }

    @Test
    @Transactional
    void patchNonExistingMaladie() throws Exception {
        int databaseSizeBeforeUpdate = maladieRepository.findAll().size();
        maladie.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMaladieMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, maladie.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(maladie))
            )
            .andExpect(status().isBadRequest());

        // Validate the Maladie in the database
        List<Maladie> maladieList = maladieRepository.findAll();
        assertThat(maladieList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchMaladie() throws Exception {
        int databaseSizeBeforeUpdate = maladieRepository.findAll().size();
        maladie.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMaladieMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(maladie))
            )
            .andExpect(status().isBadRequest());

        // Validate the Maladie in the database
        List<Maladie> maladieList = maladieRepository.findAll();
        assertThat(maladieList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamMaladie() throws Exception {
        int databaseSizeBeforeUpdate = maladieRepository.findAll().size();
        maladie.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMaladieMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(maladie)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Maladie in the database
        List<Maladie> maladieList = maladieRepository.findAll();
        assertThat(maladieList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteMaladie() throws Exception {
        // Initialize the database
        maladieRepository.saveAndFlush(maladie);

        int databaseSizeBeforeDelete = maladieRepository.findAll().size();

        // Delete the maladie
        restMaladieMockMvc
            .perform(delete(ENTITY_API_URL_ID, maladie.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Maladie> maladieList = maladieRepository.findAll();
        assertThat(maladieList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
