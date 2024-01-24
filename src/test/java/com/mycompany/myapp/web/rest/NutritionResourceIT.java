package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.Nutrition;
import com.mycompany.myapp.repository.NutritionRepository;
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
 * Integration tests for the {@link NutritionResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class NutritionResourceIT {

    private static final Integer DEFAULT_MELASSE = 1;
    private static final Integer UPDATED_MELASSE = 2;

    private static final Integer DEFAULT_PAILE = 1;
    private static final Integer UPDATED_PAILE = 2;

    private static final Integer DEFAULT_TOURTEAU_TOURNESOL = 1;
    private static final Integer UPDATED_TOURTEAU_TOURNESOL = 2;

    private static final Integer DEFAULT_BETTRAVE_SUCRIERE = 1;
    private static final Integer UPDATED_BETTRAVE_SUCRIERE = 2;

    private static final Integer DEFAULT_CMV = 1;
    private static final Integer UPDATED_CMV = 2;

    private static final Integer DEFAULT_AGE_MIN = 1;
    private static final Integer UPDATED_AGE_MIN = 2;

    private static final Integer DEFAULT_AGE_MAX = 1;
    private static final Integer UPDATED_AGE_MAX = 2;

    private static final String ENTITY_API_URL = "/api/nutritions";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private NutritionRepository nutritionRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restNutritionMockMvc;

    private Nutrition nutrition;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Nutrition createEntity(EntityManager em) {
        Nutrition nutrition = new Nutrition()
            .melasse(DEFAULT_MELASSE)
            .paile(DEFAULT_PAILE)
            .tourteauTournesol(DEFAULT_TOURTEAU_TOURNESOL)
            .bettraveSucriere(DEFAULT_BETTRAVE_SUCRIERE)
            .cmv(DEFAULT_CMV)
            .ageMin(DEFAULT_AGE_MIN)
            .ageMax(DEFAULT_AGE_MAX);
        return nutrition;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Nutrition createUpdatedEntity(EntityManager em) {
        Nutrition nutrition = new Nutrition()
            .melasse(UPDATED_MELASSE)
            .paile(UPDATED_PAILE)
            .tourteauTournesol(UPDATED_TOURTEAU_TOURNESOL)
            .bettraveSucriere(UPDATED_BETTRAVE_SUCRIERE)
            .cmv(UPDATED_CMV)
            .ageMin(UPDATED_AGE_MIN)
            .ageMax(UPDATED_AGE_MAX);
        return nutrition;
    }

    @BeforeEach
    public void initTest() {
        nutrition = createEntity(em);
    }

    @Test
    @Transactional
    void createNutrition() throws Exception {
        int databaseSizeBeforeCreate = nutritionRepository.findAll().size();
        // Create the Nutrition
        restNutritionMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(nutrition)))
            .andExpect(status().isCreated());

        // Validate the Nutrition in the database
        List<Nutrition> nutritionList = nutritionRepository.findAll();
        assertThat(nutritionList).hasSize(databaseSizeBeforeCreate + 1);
        Nutrition testNutrition = nutritionList.get(nutritionList.size() - 1);
        assertThat(testNutrition.getMelasse()).isEqualTo(DEFAULT_MELASSE);
        assertThat(testNutrition.getPaile()).isEqualTo(DEFAULT_PAILE);
        assertThat(testNutrition.getTourteauTournesol()).isEqualTo(DEFAULT_TOURTEAU_TOURNESOL);
        assertThat(testNutrition.getBettraveSucriere()).isEqualTo(DEFAULT_BETTRAVE_SUCRIERE);
        assertThat(testNutrition.getCmv()).isEqualTo(DEFAULT_CMV);
        assertThat(testNutrition.getAgeMin()).isEqualTo(DEFAULT_AGE_MIN);
        assertThat(testNutrition.getAgeMax()).isEqualTo(DEFAULT_AGE_MAX);
    }

    @Test
    @Transactional
    void createNutritionWithExistingId() throws Exception {
        // Create the Nutrition with an existing ID
        nutrition.setId(1L);

        int databaseSizeBeforeCreate = nutritionRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restNutritionMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(nutrition)))
            .andExpect(status().isBadRequest());

        // Validate the Nutrition in the database
        List<Nutrition> nutritionList = nutritionRepository.findAll();
        assertThat(nutritionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllNutritions() throws Exception {
        // Initialize the database
        nutritionRepository.saveAndFlush(nutrition);

        // Get all the nutritionList
        restNutritionMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(nutrition.getId().intValue())))
            .andExpect(jsonPath("$.[*].melasse").value(hasItem(DEFAULT_MELASSE)))
            .andExpect(jsonPath("$.[*].paile").value(hasItem(DEFAULT_PAILE)))
            .andExpect(jsonPath("$.[*].tourteauTournesol").value(hasItem(DEFAULT_TOURTEAU_TOURNESOL)))
            .andExpect(jsonPath("$.[*].bettraveSucriere").value(hasItem(DEFAULT_BETTRAVE_SUCRIERE)))
            .andExpect(jsonPath("$.[*].cmv").value(hasItem(DEFAULT_CMV)))
            .andExpect(jsonPath("$.[*].ageMin").value(hasItem(DEFAULT_AGE_MIN)))
            .andExpect(jsonPath("$.[*].ageMax").value(hasItem(DEFAULT_AGE_MAX)));
    }

    @Test
    @Transactional
    void getNutrition() throws Exception {
        // Initialize the database
        nutritionRepository.saveAndFlush(nutrition);

        // Get the nutrition
        restNutritionMockMvc
            .perform(get(ENTITY_API_URL_ID, nutrition.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(nutrition.getId().intValue()))
            .andExpect(jsonPath("$.melasse").value(DEFAULT_MELASSE))
            .andExpect(jsonPath("$.paile").value(DEFAULT_PAILE))
            .andExpect(jsonPath("$.tourteauTournesol").value(DEFAULT_TOURTEAU_TOURNESOL))
            .andExpect(jsonPath("$.bettraveSucriere").value(DEFAULT_BETTRAVE_SUCRIERE))
            .andExpect(jsonPath("$.cmv").value(DEFAULT_CMV))
            .andExpect(jsonPath("$.ageMin").value(DEFAULT_AGE_MIN))
            .andExpect(jsonPath("$.ageMax").value(DEFAULT_AGE_MAX));
    }

    @Test
    @Transactional
    void getNonExistingNutrition() throws Exception {
        // Get the nutrition
        restNutritionMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingNutrition() throws Exception {
        // Initialize the database
        nutritionRepository.saveAndFlush(nutrition);

        int databaseSizeBeforeUpdate = nutritionRepository.findAll().size();

        // Update the nutrition
        Nutrition updatedNutrition = nutritionRepository.findById(nutrition.getId()).get();
        // Disconnect from session so that the updates on updatedNutrition are not directly saved in db
        em.detach(updatedNutrition);
        updatedNutrition
            .melasse(UPDATED_MELASSE)
            .paile(UPDATED_PAILE)
            .tourteauTournesol(UPDATED_TOURTEAU_TOURNESOL)
            .bettraveSucriere(UPDATED_BETTRAVE_SUCRIERE)
            .cmv(UPDATED_CMV)
            .ageMin(UPDATED_AGE_MIN)
            .ageMax(UPDATED_AGE_MAX);

        restNutritionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedNutrition.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedNutrition))
            )
            .andExpect(status().isOk());

        // Validate the Nutrition in the database
        List<Nutrition> nutritionList = nutritionRepository.findAll();
        assertThat(nutritionList).hasSize(databaseSizeBeforeUpdate);
        Nutrition testNutrition = nutritionList.get(nutritionList.size() - 1);
        assertThat(testNutrition.getMelasse()).isEqualTo(UPDATED_MELASSE);
        assertThat(testNutrition.getPaile()).isEqualTo(UPDATED_PAILE);
        assertThat(testNutrition.getTourteauTournesol()).isEqualTo(UPDATED_TOURTEAU_TOURNESOL);
        assertThat(testNutrition.getBettraveSucriere()).isEqualTo(UPDATED_BETTRAVE_SUCRIERE);
        assertThat(testNutrition.getCmv()).isEqualTo(UPDATED_CMV);
        assertThat(testNutrition.getAgeMin()).isEqualTo(UPDATED_AGE_MIN);
        assertThat(testNutrition.getAgeMax()).isEqualTo(UPDATED_AGE_MAX);
    }

    @Test
    @Transactional
    void putNonExistingNutrition() throws Exception {
        int databaseSizeBeforeUpdate = nutritionRepository.findAll().size();
        nutrition.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNutritionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, nutrition.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(nutrition))
            )
            .andExpect(status().isBadRequest());

        // Validate the Nutrition in the database
        List<Nutrition> nutritionList = nutritionRepository.findAll();
        assertThat(nutritionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchNutrition() throws Exception {
        int databaseSizeBeforeUpdate = nutritionRepository.findAll().size();
        nutrition.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restNutritionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(nutrition))
            )
            .andExpect(status().isBadRequest());

        // Validate the Nutrition in the database
        List<Nutrition> nutritionList = nutritionRepository.findAll();
        assertThat(nutritionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamNutrition() throws Exception {
        int databaseSizeBeforeUpdate = nutritionRepository.findAll().size();
        nutrition.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restNutritionMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(nutrition)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Nutrition in the database
        List<Nutrition> nutritionList = nutritionRepository.findAll();
        assertThat(nutritionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateNutritionWithPatch() throws Exception {
        // Initialize the database
        nutritionRepository.saveAndFlush(nutrition);

        int databaseSizeBeforeUpdate = nutritionRepository.findAll().size();

        // Update the nutrition using partial update
        Nutrition partialUpdatedNutrition = new Nutrition();
        partialUpdatedNutrition.setId(nutrition.getId());

        partialUpdatedNutrition
            .paile(UPDATED_PAILE)
            .bettraveSucriere(UPDATED_BETTRAVE_SUCRIERE)
            .cmv(UPDATED_CMV)
            .ageMin(UPDATED_AGE_MIN)
            .ageMax(UPDATED_AGE_MAX);

        restNutritionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedNutrition.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedNutrition))
            )
            .andExpect(status().isOk());

        // Validate the Nutrition in the database
        List<Nutrition> nutritionList = nutritionRepository.findAll();
        assertThat(nutritionList).hasSize(databaseSizeBeforeUpdate);
        Nutrition testNutrition = nutritionList.get(nutritionList.size() - 1);
        assertThat(testNutrition.getMelasse()).isEqualTo(DEFAULT_MELASSE);
        assertThat(testNutrition.getPaile()).isEqualTo(UPDATED_PAILE);
        assertThat(testNutrition.getTourteauTournesol()).isEqualTo(DEFAULT_TOURTEAU_TOURNESOL);
        assertThat(testNutrition.getBettraveSucriere()).isEqualTo(UPDATED_BETTRAVE_SUCRIERE);
        assertThat(testNutrition.getCmv()).isEqualTo(UPDATED_CMV);
        assertThat(testNutrition.getAgeMin()).isEqualTo(UPDATED_AGE_MIN);
        assertThat(testNutrition.getAgeMax()).isEqualTo(UPDATED_AGE_MAX);
    }

    @Test
    @Transactional
    void fullUpdateNutritionWithPatch() throws Exception {
        // Initialize the database
        nutritionRepository.saveAndFlush(nutrition);

        int databaseSizeBeforeUpdate = nutritionRepository.findAll().size();

        // Update the nutrition using partial update
        Nutrition partialUpdatedNutrition = new Nutrition();
        partialUpdatedNutrition.setId(nutrition.getId());

        partialUpdatedNutrition
            .melasse(UPDATED_MELASSE)
            .paile(UPDATED_PAILE)
            .tourteauTournesol(UPDATED_TOURTEAU_TOURNESOL)
            .bettraveSucriere(UPDATED_BETTRAVE_SUCRIERE)
            .cmv(UPDATED_CMV)
            .ageMin(UPDATED_AGE_MIN)
            .ageMax(UPDATED_AGE_MAX);

        restNutritionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedNutrition.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedNutrition))
            )
            .andExpect(status().isOk());

        // Validate the Nutrition in the database
        List<Nutrition> nutritionList = nutritionRepository.findAll();
        assertThat(nutritionList).hasSize(databaseSizeBeforeUpdate);
        Nutrition testNutrition = nutritionList.get(nutritionList.size() - 1);
        assertThat(testNutrition.getMelasse()).isEqualTo(UPDATED_MELASSE);
        assertThat(testNutrition.getPaile()).isEqualTo(UPDATED_PAILE);
        assertThat(testNutrition.getTourteauTournesol()).isEqualTo(UPDATED_TOURTEAU_TOURNESOL);
        assertThat(testNutrition.getBettraveSucriere()).isEqualTo(UPDATED_BETTRAVE_SUCRIERE);
        assertThat(testNutrition.getCmv()).isEqualTo(UPDATED_CMV);
        assertThat(testNutrition.getAgeMin()).isEqualTo(UPDATED_AGE_MIN);
        assertThat(testNutrition.getAgeMax()).isEqualTo(UPDATED_AGE_MAX);
    }

    @Test
    @Transactional
    void patchNonExistingNutrition() throws Exception {
        int databaseSizeBeforeUpdate = nutritionRepository.findAll().size();
        nutrition.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNutritionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, nutrition.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(nutrition))
            )
            .andExpect(status().isBadRequest());

        // Validate the Nutrition in the database
        List<Nutrition> nutritionList = nutritionRepository.findAll();
        assertThat(nutritionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchNutrition() throws Exception {
        int databaseSizeBeforeUpdate = nutritionRepository.findAll().size();
        nutrition.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restNutritionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(nutrition))
            )
            .andExpect(status().isBadRequest());

        // Validate the Nutrition in the database
        List<Nutrition> nutritionList = nutritionRepository.findAll();
        assertThat(nutritionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamNutrition() throws Exception {
        int databaseSizeBeforeUpdate = nutritionRepository.findAll().size();
        nutrition.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restNutritionMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(nutrition))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Nutrition in the database
        List<Nutrition> nutritionList = nutritionRepository.findAll();
        assertThat(nutritionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteNutrition() throws Exception {
        // Initialize the database
        nutritionRepository.saveAndFlush(nutrition);

        int databaseSizeBeforeDelete = nutritionRepository.findAll().size();

        // Delete the nutrition
        restNutritionMockMvc
            .perform(delete(ENTITY_API_URL_ID, nutrition.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Nutrition> nutritionList = nutritionRepository.findAll();
        assertThat(nutritionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
