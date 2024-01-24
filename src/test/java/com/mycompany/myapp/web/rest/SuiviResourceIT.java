package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.Suivi;
import com.mycompany.myapp.repository.SuiviRepository;
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
 * Integration tests for the {@link SuiviResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class SuiviResourceIT {

    private static final Integer DEFAULT_POIDS_0 = 1;
    private static final Integer UPDATED_POIDS_0 = 2;

    private static final Integer DEFAULT_POIDS_30 = 1;
    private static final Integer UPDATED_POIDS_30 = 2;

    private static final Integer DEFAULT_POIDS_90 = 1;
    private static final Integer UPDATED_POIDS_90 = 2;

    private static final Integer DEFAULT_GMQ_30 = 1;
    private static final Integer UPDATED_GMQ_30 = 2;

    private static final Integer DEFAULT_GMQ_3070 = 1;
    private static final Integer UPDATED_GMQ_3070 = 2;

    private static final Integer DEFAULT_CHANGE_DENTS = 1;
    private static final Integer UPDATED_CHANGE_DENTS = 2;

    private static final String ENTITY_API_URL = "/api/suivis";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private SuiviRepository suiviRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSuiviMockMvc;

    private Suivi suivi;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Suivi createEntity(EntityManager em) {
        Suivi suivi = new Suivi()
            .poids0(DEFAULT_POIDS_0)
            .poids30(DEFAULT_POIDS_30)
            .poids90(DEFAULT_POIDS_90)
            .gmq30(DEFAULT_GMQ_30)
            .gmq3070(DEFAULT_GMQ_3070)
            .changeDents(DEFAULT_CHANGE_DENTS);
        return suivi;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Suivi createUpdatedEntity(EntityManager em) {
        Suivi suivi = new Suivi()
            .poids0(UPDATED_POIDS_0)
            .poids30(UPDATED_POIDS_30)
            .poids90(UPDATED_POIDS_90)
            .gmq30(UPDATED_GMQ_30)
            .gmq3070(UPDATED_GMQ_3070)
            .changeDents(UPDATED_CHANGE_DENTS);
        return suivi;
    }

    @BeforeEach
    public void initTest() {
        suivi = createEntity(em);
    }

    @Test
    @Transactional
    void createSuivi() throws Exception {
        int databaseSizeBeforeCreate = suiviRepository.findAll().size();
        // Create the Suivi
        restSuiviMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(suivi)))
            .andExpect(status().isCreated());

        // Validate the Suivi in the database
        List<Suivi> suiviList = suiviRepository.findAll();
        assertThat(suiviList).hasSize(databaseSizeBeforeCreate + 1);
        Suivi testSuivi = suiviList.get(suiviList.size() - 1);
        assertThat(testSuivi.getPoids0()).isEqualTo(DEFAULT_POIDS_0);
        assertThat(testSuivi.getPoids30()).isEqualTo(DEFAULT_POIDS_30);
        assertThat(testSuivi.getPoids90()).isEqualTo(DEFAULT_POIDS_90);
        assertThat(testSuivi.getGmq30()).isEqualTo(DEFAULT_GMQ_30);
        assertThat(testSuivi.getGmq3070()).isEqualTo(DEFAULT_GMQ_3070);
        assertThat(testSuivi.getChangeDents()).isEqualTo(DEFAULT_CHANGE_DENTS);
    }

    @Test
    @Transactional
    void createSuiviWithExistingId() throws Exception {
        // Create the Suivi with an existing ID
        suivi.setId(1L);

        int databaseSizeBeforeCreate = suiviRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restSuiviMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(suivi)))
            .andExpect(status().isBadRequest());

        // Validate the Suivi in the database
        List<Suivi> suiviList = suiviRepository.findAll();
        assertThat(suiviList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllSuivis() throws Exception {
        // Initialize the database
        suiviRepository.saveAndFlush(suivi);

        // Get all the suiviList
        restSuiviMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(suivi.getId().intValue())))
            .andExpect(jsonPath("$.[*].poids0").value(hasItem(DEFAULT_POIDS_0)))
            .andExpect(jsonPath("$.[*].poids30").value(hasItem(DEFAULT_POIDS_30)))
            .andExpect(jsonPath("$.[*].poids90").value(hasItem(DEFAULT_POIDS_90)))
            .andExpect(jsonPath("$.[*].gmq30").value(hasItem(DEFAULT_GMQ_30)))
            .andExpect(jsonPath("$.[*].gmq3070").value(hasItem(DEFAULT_GMQ_3070)))
            .andExpect(jsonPath("$.[*].changeDents").value(hasItem(DEFAULT_CHANGE_DENTS)));
    }

    @Test
    @Transactional
    void getSuivi() throws Exception {
        // Initialize the database
        suiviRepository.saveAndFlush(suivi);

        // Get the suivi
        restSuiviMockMvc
            .perform(get(ENTITY_API_URL_ID, suivi.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(suivi.getId().intValue()))
            .andExpect(jsonPath("$.poids0").value(DEFAULT_POIDS_0))
            .andExpect(jsonPath("$.poids30").value(DEFAULT_POIDS_30))
            .andExpect(jsonPath("$.poids90").value(DEFAULT_POIDS_90))
            .andExpect(jsonPath("$.gmq30").value(DEFAULT_GMQ_30))
            .andExpect(jsonPath("$.gmq3070").value(DEFAULT_GMQ_3070))
            .andExpect(jsonPath("$.changeDents").value(DEFAULT_CHANGE_DENTS));
    }

    @Test
    @Transactional
    void getNonExistingSuivi() throws Exception {
        // Get the suivi
        restSuiviMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingSuivi() throws Exception {
        // Initialize the database
        suiviRepository.saveAndFlush(suivi);

        int databaseSizeBeforeUpdate = suiviRepository.findAll().size();

        // Update the suivi
        Suivi updatedSuivi = suiviRepository.findById(suivi.getId()).get();
        // Disconnect from session so that the updates on updatedSuivi are not directly saved in db
        em.detach(updatedSuivi);
        updatedSuivi
            .poids0(UPDATED_POIDS_0)
            .poids30(UPDATED_POIDS_30)
            .poids90(UPDATED_POIDS_90)
            .gmq30(UPDATED_GMQ_30)
            .gmq3070(UPDATED_GMQ_3070)
            .changeDents(UPDATED_CHANGE_DENTS);

        restSuiviMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedSuivi.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedSuivi))
            )
            .andExpect(status().isOk());

        // Validate the Suivi in the database
        List<Suivi> suiviList = suiviRepository.findAll();
        assertThat(suiviList).hasSize(databaseSizeBeforeUpdate);
        Suivi testSuivi = suiviList.get(suiviList.size() - 1);
        assertThat(testSuivi.getPoids0()).isEqualTo(UPDATED_POIDS_0);
        assertThat(testSuivi.getPoids30()).isEqualTo(UPDATED_POIDS_30);
        assertThat(testSuivi.getPoids90()).isEqualTo(UPDATED_POIDS_90);
        assertThat(testSuivi.getGmq30()).isEqualTo(UPDATED_GMQ_30);
        assertThat(testSuivi.getGmq3070()).isEqualTo(UPDATED_GMQ_3070);
        assertThat(testSuivi.getChangeDents()).isEqualTo(UPDATED_CHANGE_DENTS);
    }

    @Test
    @Transactional
    void putNonExistingSuivi() throws Exception {
        int databaseSizeBeforeUpdate = suiviRepository.findAll().size();
        suivi.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSuiviMockMvc
            .perform(
                put(ENTITY_API_URL_ID, suivi.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(suivi))
            )
            .andExpect(status().isBadRequest());

        // Validate the Suivi in the database
        List<Suivi> suiviList = suiviRepository.findAll();
        assertThat(suiviList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchSuivi() throws Exception {
        int databaseSizeBeforeUpdate = suiviRepository.findAll().size();
        suivi.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSuiviMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(suivi))
            )
            .andExpect(status().isBadRequest());

        // Validate the Suivi in the database
        List<Suivi> suiviList = suiviRepository.findAll();
        assertThat(suiviList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamSuivi() throws Exception {
        int databaseSizeBeforeUpdate = suiviRepository.findAll().size();
        suivi.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSuiviMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(suivi)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Suivi in the database
        List<Suivi> suiviList = suiviRepository.findAll();
        assertThat(suiviList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateSuiviWithPatch() throws Exception {
        // Initialize the database
        suiviRepository.saveAndFlush(suivi);

        int databaseSizeBeforeUpdate = suiviRepository.findAll().size();

        // Update the suivi using partial update
        Suivi partialUpdatedSuivi = new Suivi();
        partialUpdatedSuivi.setId(suivi.getId());

        partialUpdatedSuivi.poids30(UPDATED_POIDS_30).gmq30(UPDATED_GMQ_30);

        restSuiviMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedSuivi.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedSuivi))
            )
            .andExpect(status().isOk());

        // Validate the Suivi in the database
        List<Suivi> suiviList = suiviRepository.findAll();
        assertThat(suiviList).hasSize(databaseSizeBeforeUpdate);
        Suivi testSuivi = suiviList.get(suiviList.size() - 1);
        assertThat(testSuivi.getPoids0()).isEqualTo(DEFAULT_POIDS_0);
        assertThat(testSuivi.getPoids30()).isEqualTo(UPDATED_POIDS_30);
        assertThat(testSuivi.getPoids90()).isEqualTo(DEFAULT_POIDS_90);
        assertThat(testSuivi.getGmq30()).isEqualTo(UPDATED_GMQ_30);
        assertThat(testSuivi.getGmq3070()).isEqualTo(DEFAULT_GMQ_3070);
        assertThat(testSuivi.getChangeDents()).isEqualTo(DEFAULT_CHANGE_DENTS);
    }

    @Test
    @Transactional
    void fullUpdateSuiviWithPatch() throws Exception {
        // Initialize the database
        suiviRepository.saveAndFlush(suivi);

        int databaseSizeBeforeUpdate = suiviRepository.findAll().size();

        // Update the suivi using partial update
        Suivi partialUpdatedSuivi = new Suivi();
        partialUpdatedSuivi.setId(suivi.getId());

        partialUpdatedSuivi
            .poids0(UPDATED_POIDS_0)
            .poids30(UPDATED_POIDS_30)
            .poids90(UPDATED_POIDS_90)
            .gmq30(UPDATED_GMQ_30)
            .gmq3070(UPDATED_GMQ_3070)
            .changeDents(UPDATED_CHANGE_DENTS);

        restSuiviMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedSuivi.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedSuivi))
            )
            .andExpect(status().isOk());

        // Validate the Suivi in the database
        List<Suivi> suiviList = suiviRepository.findAll();
        assertThat(suiviList).hasSize(databaseSizeBeforeUpdate);
        Suivi testSuivi = suiviList.get(suiviList.size() - 1);
        assertThat(testSuivi.getPoids0()).isEqualTo(UPDATED_POIDS_0);
        assertThat(testSuivi.getPoids30()).isEqualTo(UPDATED_POIDS_30);
        assertThat(testSuivi.getPoids90()).isEqualTo(UPDATED_POIDS_90);
        assertThat(testSuivi.getGmq30()).isEqualTo(UPDATED_GMQ_30);
        assertThat(testSuivi.getGmq3070()).isEqualTo(UPDATED_GMQ_3070);
        assertThat(testSuivi.getChangeDents()).isEqualTo(UPDATED_CHANGE_DENTS);
    }

    @Test
    @Transactional
    void patchNonExistingSuivi() throws Exception {
        int databaseSizeBeforeUpdate = suiviRepository.findAll().size();
        suivi.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSuiviMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, suivi.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(suivi))
            )
            .andExpect(status().isBadRequest());

        // Validate the Suivi in the database
        List<Suivi> suiviList = suiviRepository.findAll();
        assertThat(suiviList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchSuivi() throws Exception {
        int databaseSizeBeforeUpdate = suiviRepository.findAll().size();
        suivi.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSuiviMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(suivi))
            )
            .andExpect(status().isBadRequest());

        // Validate the Suivi in the database
        List<Suivi> suiviList = suiviRepository.findAll();
        assertThat(suiviList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamSuivi() throws Exception {
        int databaseSizeBeforeUpdate = suiviRepository.findAll().size();
        suivi.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSuiviMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(suivi)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Suivi in the database
        List<Suivi> suiviList = suiviRepository.findAll();
        assertThat(suiviList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteSuivi() throws Exception {
        // Initialize the database
        suiviRepository.saveAndFlush(suivi);

        int databaseSizeBeforeDelete = suiviRepository.findAll().size();

        // Delete the suivi
        restSuiviMockMvc
            .perform(delete(ENTITY_API_URL_ID, suivi.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Suivi> suiviList = suiviRepository.findAll();
        assertThat(suiviList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
