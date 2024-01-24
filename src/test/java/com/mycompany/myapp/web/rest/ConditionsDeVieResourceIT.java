package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.ConditionsDeVie;
import com.mycompany.myapp.repository.ConditionsDeVieRepository;
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
 * Integration tests for the {@link ConditionsDeVieResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ConditionsDeVieResourceIT {

    private static final Integer DEFAULT_AGE_MIN = 1;
    private static final Integer UPDATED_AGE_MIN = 2;

    private static final Integer DEFAULT_AGE_MAX = 1;
    private static final Integer UPDATED_AGE_MAX = 2;

    private static final Integer DEFAULT_TEMPERATURE = 1;
    private static final Integer UPDATED_TEMPERATURE = 2;

    private static final Integer DEFAULT_VITESSE_AIR = 1;
    private static final Integer UPDATED_VITESSE_AIR = 2;

    private static final Integer DEFAULT_SOL = 1;
    private static final Integer UPDATED_SOL = 2;

    private static final String ENTITY_API_URL = "/api/conditions-de-vies";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ConditionsDeVieRepository conditionsDeVieRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restConditionsDeVieMockMvc;

    private ConditionsDeVie conditionsDeVie;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ConditionsDeVie createEntity(EntityManager em) {
        ConditionsDeVie conditionsDeVie = new ConditionsDeVie()
            .ageMin(DEFAULT_AGE_MIN)
            .ageMax(DEFAULT_AGE_MAX)
            .temperature(DEFAULT_TEMPERATURE)
            .vitesseAir(DEFAULT_VITESSE_AIR)
            .sol(DEFAULT_SOL);
        return conditionsDeVie;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ConditionsDeVie createUpdatedEntity(EntityManager em) {
        ConditionsDeVie conditionsDeVie = new ConditionsDeVie()
            .ageMin(UPDATED_AGE_MIN)
            .ageMax(UPDATED_AGE_MAX)
            .temperature(UPDATED_TEMPERATURE)
            .vitesseAir(UPDATED_VITESSE_AIR)
            .sol(UPDATED_SOL);
        return conditionsDeVie;
    }

    @BeforeEach
    public void initTest() {
        conditionsDeVie = createEntity(em);
    }

    @Test
    @Transactional
    void createConditionsDeVie() throws Exception {
        int databaseSizeBeforeCreate = conditionsDeVieRepository.findAll().size();
        // Create the ConditionsDeVie
        restConditionsDeVieMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(conditionsDeVie))
            )
            .andExpect(status().isCreated());

        // Validate the ConditionsDeVie in the database
        List<ConditionsDeVie> conditionsDeVieList = conditionsDeVieRepository.findAll();
        assertThat(conditionsDeVieList).hasSize(databaseSizeBeforeCreate + 1);
        ConditionsDeVie testConditionsDeVie = conditionsDeVieList.get(conditionsDeVieList.size() - 1);
        assertThat(testConditionsDeVie.getAgeMin()).isEqualTo(DEFAULT_AGE_MIN);
        assertThat(testConditionsDeVie.getAgeMax()).isEqualTo(DEFAULT_AGE_MAX);
        assertThat(testConditionsDeVie.getTemperature()).isEqualTo(DEFAULT_TEMPERATURE);
        assertThat(testConditionsDeVie.getVitesseAir()).isEqualTo(DEFAULT_VITESSE_AIR);
        assertThat(testConditionsDeVie.getSol()).isEqualTo(DEFAULT_SOL);
    }

    @Test
    @Transactional
    void createConditionsDeVieWithExistingId() throws Exception {
        // Create the ConditionsDeVie with an existing ID
        conditionsDeVie.setId(1L);

        int databaseSizeBeforeCreate = conditionsDeVieRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restConditionsDeVieMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(conditionsDeVie))
            )
            .andExpect(status().isBadRequest());

        // Validate the ConditionsDeVie in the database
        List<ConditionsDeVie> conditionsDeVieList = conditionsDeVieRepository.findAll();
        assertThat(conditionsDeVieList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllConditionsDeVies() throws Exception {
        // Initialize the database
        conditionsDeVieRepository.saveAndFlush(conditionsDeVie);

        // Get all the conditionsDeVieList
        restConditionsDeVieMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(conditionsDeVie.getId().intValue())))
            .andExpect(jsonPath("$.[*].ageMin").value(hasItem(DEFAULT_AGE_MIN)))
            .andExpect(jsonPath("$.[*].ageMax").value(hasItem(DEFAULT_AGE_MAX)))
            .andExpect(jsonPath("$.[*].temperature").value(hasItem(DEFAULT_TEMPERATURE)))
            .andExpect(jsonPath("$.[*].vitesseAir").value(hasItem(DEFAULT_VITESSE_AIR)))
            .andExpect(jsonPath("$.[*].sol").value(hasItem(DEFAULT_SOL)));
    }

    @Test
    @Transactional
    void getConditionsDeVie() throws Exception {
        // Initialize the database
        conditionsDeVieRepository.saveAndFlush(conditionsDeVie);

        // Get the conditionsDeVie
        restConditionsDeVieMockMvc
            .perform(get(ENTITY_API_URL_ID, conditionsDeVie.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(conditionsDeVie.getId().intValue()))
            .andExpect(jsonPath("$.ageMin").value(DEFAULT_AGE_MIN))
            .andExpect(jsonPath("$.ageMax").value(DEFAULT_AGE_MAX))
            .andExpect(jsonPath("$.temperature").value(DEFAULT_TEMPERATURE))
            .andExpect(jsonPath("$.vitesseAir").value(DEFAULT_VITESSE_AIR))
            .andExpect(jsonPath("$.sol").value(DEFAULT_SOL));
    }

    @Test
    @Transactional
    void getNonExistingConditionsDeVie() throws Exception {
        // Get the conditionsDeVie
        restConditionsDeVieMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingConditionsDeVie() throws Exception {
        // Initialize the database
        conditionsDeVieRepository.saveAndFlush(conditionsDeVie);

        int databaseSizeBeforeUpdate = conditionsDeVieRepository.findAll().size();

        // Update the conditionsDeVie
        ConditionsDeVie updatedConditionsDeVie = conditionsDeVieRepository.findById(conditionsDeVie.getId()).get();
        // Disconnect from session so that the updates on updatedConditionsDeVie are not directly saved in db
        em.detach(updatedConditionsDeVie);
        updatedConditionsDeVie
            .ageMin(UPDATED_AGE_MIN)
            .ageMax(UPDATED_AGE_MAX)
            .temperature(UPDATED_TEMPERATURE)
            .vitesseAir(UPDATED_VITESSE_AIR)
            .sol(UPDATED_SOL);

        restConditionsDeVieMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedConditionsDeVie.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedConditionsDeVie))
            )
            .andExpect(status().isOk());

        // Validate the ConditionsDeVie in the database
        List<ConditionsDeVie> conditionsDeVieList = conditionsDeVieRepository.findAll();
        assertThat(conditionsDeVieList).hasSize(databaseSizeBeforeUpdate);
        ConditionsDeVie testConditionsDeVie = conditionsDeVieList.get(conditionsDeVieList.size() - 1);
        assertThat(testConditionsDeVie.getAgeMin()).isEqualTo(UPDATED_AGE_MIN);
        assertThat(testConditionsDeVie.getAgeMax()).isEqualTo(UPDATED_AGE_MAX);
        assertThat(testConditionsDeVie.getTemperature()).isEqualTo(UPDATED_TEMPERATURE);
        assertThat(testConditionsDeVie.getVitesseAir()).isEqualTo(UPDATED_VITESSE_AIR);
        assertThat(testConditionsDeVie.getSol()).isEqualTo(UPDATED_SOL);
    }

    @Test
    @Transactional
    void putNonExistingConditionsDeVie() throws Exception {
        int databaseSizeBeforeUpdate = conditionsDeVieRepository.findAll().size();
        conditionsDeVie.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restConditionsDeVieMockMvc
            .perform(
                put(ENTITY_API_URL_ID, conditionsDeVie.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(conditionsDeVie))
            )
            .andExpect(status().isBadRequest());

        // Validate the ConditionsDeVie in the database
        List<ConditionsDeVie> conditionsDeVieList = conditionsDeVieRepository.findAll();
        assertThat(conditionsDeVieList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchConditionsDeVie() throws Exception {
        int databaseSizeBeforeUpdate = conditionsDeVieRepository.findAll().size();
        conditionsDeVie.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restConditionsDeVieMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(conditionsDeVie))
            )
            .andExpect(status().isBadRequest());

        // Validate the ConditionsDeVie in the database
        List<ConditionsDeVie> conditionsDeVieList = conditionsDeVieRepository.findAll();
        assertThat(conditionsDeVieList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamConditionsDeVie() throws Exception {
        int databaseSizeBeforeUpdate = conditionsDeVieRepository.findAll().size();
        conditionsDeVie.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restConditionsDeVieMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(conditionsDeVie))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ConditionsDeVie in the database
        List<ConditionsDeVie> conditionsDeVieList = conditionsDeVieRepository.findAll();
        assertThat(conditionsDeVieList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateConditionsDeVieWithPatch() throws Exception {
        // Initialize the database
        conditionsDeVieRepository.saveAndFlush(conditionsDeVie);

        int databaseSizeBeforeUpdate = conditionsDeVieRepository.findAll().size();

        // Update the conditionsDeVie using partial update
        ConditionsDeVie partialUpdatedConditionsDeVie = new ConditionsDeVie();
        partialUpdatedConditionsDeVie.setId(conditionsDeVie.getId());

        partialUpdatedConditionsDeVie.ageMax(UPDATED_AGE_MAX).vitesseAir(UPDATED_VITESSE_AIR);

        restConditionsDeVieMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedConditionsDeVie.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedConditionsDeVie))
            )
            .andExpect(status().isOk());

        // Validate the ConditionsDeVie in the database
        List<ConditionsDeVie> conditionsDeVieList = conditionsDeVieRepository.findAll();
        assertThat(conditionsDeVieList).hasSize(databaseSizeBeforeUpdate);
        ConditionsDeVie testConditionsDeVie = conditionsDeVieList.get(conditionsDeVieList.size() - 1);
        assertThat(testConditionsDeVie.getAgeMin()).isEqualTo(DEFAULT_AGE_MIN);
        assertThat(testConditionsDeVie.getAgeMax()).isEqualTo(UPDATED_AGE_MAX);
        assertThat(testConditionsDeVie.getTemperature()).isEqualTo(DEFAULT_TEMPERATURE);
        assertThat(testConditionsDeVie.getVitesseAir()).isEqualTo(UPDATED_VITESSE_AIR);
        assertThat(testConditionsDeVie.getSol()).isEqualTo(DEFAULT_SOL);
    }

    @Test
    @Transactional
    void fullUpdateConditionsDeVieWithPatch() throws Exception {
        // Initialize the database
        conditionsDeVieRepository.saveAndFlush(conditionsDeVie);

        int databaseSizeBeforeUpdate = conditionsDeVieRepository.findAll().size();

        // Update the conditionsDeVie using partial update
        ConditionsDeVie partialUpdatedConditionsDeVie = new ConditionsDeVie();
        partialUpdatedConditionsDeVie.setId(conditionsDeVie.getId());

        partialUpdatedConditionsDeVie
            .ageMin(UPDATED_AGE_MIN)
            .ageMax(UPDATED_AGE_MAX)
            .temperature(UPDATED_TEMPERATURE)
            .vitesseAir(UPDATED_VITESSE_AIR)
            .sol(UPDATED_SOL);

        restConditionsDeVieMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedConditionsDeVie.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedConditionsDeVie))
            )
            .andExpect(status().isOk());

        // Validate the ConditionsDeVie in the database
        List<ConditionsDeVie> conditionsDeVieList = conditionsDeVieRepository.findAll();
        assertThat(conditionsDeVieList).hasSize(databaseSizeBeforeUpdate);
        ConditionsDeVie testConditionsDeVie = conditionsDeVieList.get(conditionsDeVieList.size() - 1);
        assertThat(testConditionsDeVie.getAgeMin()).isEqualTo(UPDATED_AGE_MIN);
        assertThat(testConditionsDeVie.getAgeMax()).isEqualTo(UPDATED_AGE_MAX);
        assertThat(testConditionsDeVie.getTemperature()).isEqualTo(UPDATED_TEMPERATURE);
        assertThat(testConditionsDeVie.getVitesseAir()).isEqualTo(UPDATED_VITESSE_AIR);
        assertThat(testConditionsDeVie.getSol()).isEqualTo(UPDATED_SOL);
    }

    @Test
    @Transactional
    void patchNonExistingConditionsDeVie() throws Exception {
        int databaseSizeBeforeUpdate = conditionsDeVieRepository.findAll().size();
        conditionsDeVie.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restConditionsDeVieMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, conditionsDeVie.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(conditionsDeVie))
            )
            .andExpect(status().isBadRequest());

        // Validate the ConditionsDeVie in the database
        List<ConditionsDeVie> conditionsDeVieList = conditionsDeVieRepository.findAll();
        assertThat(conditionsDeVieList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchConditionsDeVie() throws Exception {
        int databaseSizeBeforeUpdate = conditionsDeVieRepository.findAll().size();
        conditionsDeVie.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restConditionsDeVieMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(conditionsDeVie))
            )
            .andExpect(status().isBadRequest());

        // Validate the ConditionsDeVie in the database
        List<ConditionsDeVie> conditionsDeVieList = conditionsDeVieRepository.findAll();
        assertThat(conditionsDeVieList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamConditionsDeVie() throws Exception {
        int databaseSizeBeforeUpdate = conditionsDeVieRepository.findAll().size();
        conditionsDeVie.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restConditionsDeVieMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(conditionsDeVie))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ConditionsDeVie in the database
        List<ConditionsDeVie> conditionsDeVieList = conditionsDeVieRepository.findAll();
        assertThat(conditionsDeVieList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteConditionsDeVie() throws Exception {
        // Initialize the database
        conditionsDeVieRepository.saveAndFlush(conditionsDeVie);

        int databaseSizeBeforeDelete = conditionsDeVieRepository.findAll().size();

        // Delete the conditionsDeVie
        restConditionsDeVieMockMvc
            .perform(delete(ENTITY_API_URL_ID, conditionsDeVie.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ConditionsDeVie> conditionsDeVieList = conditionsDeVieRepository.findAll();
        assertThat(conditionsDeVieList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
