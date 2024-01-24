package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.Sante;
import com.mycompany.myapp.repository.SanteRepository;
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
 * Integration tests for the {@link SanteResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class SanteResourceIT {

    private static final String DEFAULT_TRAITEMENTS_PREVENTIFS = "AAAAAAAAAA";
    private static final String UPDATED_TRAITEMENTS_PREVENTIFS = "BBBBBBBBBB";

    private static final String DEFAULT_SOINS = "AAAAAAAAAA";
    private static final String UPDATED_SOINS = "BBBBBBBBBB";

    private static final String DEFAULT_VACCINS = "AAAAAAAAAA";
    private static final String UPDATED_VACCINS = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/santes";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private SanteRepository santeRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSanteMockMvc;

    private Sante sante;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Sante createEntity(EntityManager em) {
        Sante sante = new Sante().traitementsPreventifs(DEFAULT_TRAITEMENTS_PREVENTIFS).soins(DEFAULT_SOINS).vaccins(DEFAULT_VACCINS);
        return sante;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Sante createUpdatedEntity(EntityManager em) {
        Sante sante = new Sante().traitementsPreventifs(UPDATED_TRAITEMENTS_PREVENTIFS).soins(UPDATED_SOINS).vaccins(UPDATED_VACCINS);
        return sante;
    }

    @BeforeEach
    public void initTest() {
        sante = createEntity(em);
    }

    @Test
    @Transactional
    void createSante() throws Exception {
        int databaseSizeBeforeCreate = santeRepository.findAll().size();
        // Create the Sante
        restSanteMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(sante)))
            .andExpect(status().isCreated());

        // Validate the Sante in the database
        List<Sante> santeList = santeRepository.findAll();
        assertThat(santeList).hasSize(databaseSizeBeforeCreate + 1);
        Sante testSante = santeList.get(santeList.size() - 1);
        assertThat(testSante.getTraitementsPreventifs()).isEqualTo(DEFAULT_TRAITEMENTS_PREVENTIFS);
        assertThat(testSante.getSoins()).isEqualTo(DEFAULT_SOINS);
        assertThat(testSante.getVaccins()).isEqualTo(DEFAULT_VACCINS);
    }

    @Test
    @Transactional
    void createSanteWithExistingId() throws Exception {
        // Create the Sante with an existing ID
        sante.setId(1L);

        int databaseSizeBeforeCreate = santeRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restSanteMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(sante)))
            .andExpect(status().isBadRequest());

        // Validate the Sante in the database
        List<Sante> santeList = santeRepository.findAll();
        assertThat(santeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllSantes() throws Exception {
        // Initialize the database
        santeRepository.saveAndFlush(sante);

        // Get all the santeList
        restSanteMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(sante.getId().intValue())))
            .andExpect(jsonPath("$.[*].traitementsPreventifs").value(hasItem(DEFAULT_TRAITEMENTS_PREVENTIFS)))
            .andExpect(jsonPath("$.[*].soins").value(hasItem(DEFAULT_SOINS)))
            .andExpect(jsonPath("$.[*].vaccins").value(hasItem(DEFAULT_VACCINS)));
    }

    @Test
    @Transactional
    void getSante() throws Exception {
        // Initialize the database
        santeRepository.saveAndFlush(sante);

        // Get the sante
        restSanteMockMvc
            .perform(get(ENTITY_API_URL_ID, sante.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(sante.getId().intValue()))
            .andExpect(jsonPath("$.traitementsPreventifs").value(DEFAULT_TRAITEMENTS_PREVENTIFS))
            .andExpect(jsonPath("$.soins").value(DEFAULT_SOINS))
            .andExpect(jsonPath("$.vaccins").value(DEFAULT_VACCINS));
    }

    @Test
    @Transactional
    void getNonExistingSante() throws Exception {
        // Get the sante
        restSanteMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingSante() throws Exception {
        // Initialize the database
        santeRepository.saveAndFlush(sante);

        int databaseSizeBeforeUpdate = santeRepository.findAll().size();

        // Update the sante
        Sante updatedSante = santeRepository.findById(sante.getId()).get();
        // Disconnect from session so that the updates on updatedSante are not directly saved in db
        em.detach(updatedSante);
        updatedSante.traitementsPreventifs(UPDATED_TRAITEMENTS_PREVENTIFS).soins(UPDATED_SOINS).vaccins(UPDATED_VACCINS);

        restSanteMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedSante.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedSante))
            )
            .andExpect(status().isOk());

        // Validate the Sante in the database
        List<Sante> santeList = santeRepository.findAll();
        assertThat(santeList).hasSize(databaseSizeBeforeUpdate);
        Sante testSante = santeList.get(santeList.size() - 1);
        assertThat(testSante.getTraitementsPreventifs()).isEqualTo(UPDATED_TRAITEMENTS_PREVENTIFS);
        assertThat(testSante.getSoins()).isEqualTo(UPDATED_SOINS);
        assertThat(testSante.getVaccins()).isEqualTo(UPDATED_VACCINS);
    }

    @Test
    @Transactional
    void putNonExistingSante() throws Exception {
        int databaseSizeBeforeUpdate = santeRepository.findAll().size();
        sante.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSanteMockMvc
            .perform(
                put(ENTITY_API_URL_ID, sante.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(sante))
            )
            .andExpect(status().isBadRequest());

        // Validate the Sante in the database
        List<Sante> santeList = santeRepository.findAll();
        assertThat(santeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchSante() throws Exception {
        int databaseSizeBeforeUpdate = santeRepository.findAll().size();
        sante.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSanteMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(sante))
            )
            .andExpect(status().isBadRequest());

        // Validate the Sante in the database
        List<Sante> santeList = santeRepository.findAll();
        assertThat(santeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamSante() throws Exception {
        int databaseSizeBeforeUpdate = santeRepository.findAll().size();
        sante.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSanteMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(sante)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Sante in the database
        List<Sante> santeList = santeRepository.findAll();
        assertThat(santeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateSanteWithPatch() throws Exception {
        // Initialize the database
        santeRepository.saveAndFlush(sante);

        int databaseSizeBeforeUpdate = santeRepository.findAll().size();

        // Update the sante using partial update
        Sante partialUpdatedSante = new Sante();
        partialUpdatedSante.setId(sante.getId());

        partialUpdatedSante.vaccins(UPDATED_VACCINS);

        restSanteMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedSante.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedSante))
            )
            .andExpect(status().isOk());

        // Validate the Sante in the database
        List<Sante> santeList = santeRepository.findAll();
        assertThat(santeList).hasSize(databaseSizeBeforeUpdate);
        Sante testSante = santeList.get(santeList.size() - 1);
        assertThat(testSante.getTraitementsPreventifs()).isEqualTo(DEFAULT_TRAITEMENTS_PREVENTIFS);
        assertThat(testSante.getSoins()).isEqualTo(DEFAULT_SOINS);
        assertThat(testSante.getVaccins()).isEqualTo(UPDATED_VACCINS);
    }

    @Test
    @Transactional
    void fullUpdateSanteWithPatch() throws Exception {
        // Initialize the database
        santeRepository.saveAndFlush(sante);

        int databaseSizeBeforeUpdate = santeRepository.findAll().size();

        // Update the sante using partial update
        Sante partialUpdatedSante = new Sante();
        partialUpdatedSante.setId(sante.getId());

        partialUpdatedSante.traitementsPreventifs(UPDATED_TRAITEMENTS_PREVENTIFS).soins(UPDATED_SOINS).vaccins(UPDATED_VACCINS);

        restSanteMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedSante.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedSante))
            )
            .andExpect(status().isOk());

        // Validate the Sante in the database
        List<Sante> santeList = santeRepository.findAll();
        assertThat(santeList).hasSize(databaseSizeBeforeUpdate);
        Sante testSante = santeList.get(santeList.size() - 1);
        assertThat(testSante.getTraitementsPreventifs()).isEqualTo(UPDATED_TRAITEMENTS_PREVENTIFS);
        assertThat(testSante.getSoins()).isEqualTo(UPDATED_SOINS);
        assertThat(testSante.getVaccins()).isEqualTo(UPDATED_VACCINS);
    }

    @Test
    @Transactional
    void patchNonExistingSante() throws Exception {
        int databaseSizeBeforeUpdate = santeRepository.findAll().size();
        sante.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSanteMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, sante.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(sante))
            )
            .andExpect(status().isBadRequest());

        // Validate the Sante in the database
        List<Sante> santeList = santeRepository.findAll();
        assertThat(santeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchSante() throws Exception {
        int databaseSizeBeforeUpdate = santeRepository.findAll().size();
        sante.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSanteMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(sante))
            )
            .andExpect(status().isBadRequest());

        // Validate the Sante in the database
        List<Sante> santeList = santeRepository.findAll();
        assertThat(santeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamSante() throws Exception {
        int databaseSizeBeforeUpdate = santeRepository.findAll().size();
        sante.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSanteMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(sante)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Sante in the database
        List<Sante> santeList = santeRepository.findAll();
        assertThat(santeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteSante() throws Exception {
        // Initialize the database
        santeRepository.saveAndFlush(sante);

        int databaseSizeBeforeDelete = santeRepository.findAll().size();

        // Delete the sante
        restSanteMockMvc
            .perform(delete(ENTITY_API_URL_ID, sante.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Sante> santeList = santeRepository.findAll();
        assertThat(santeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
