package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.Genetique;
import com.mycompany.myapp.repository.GenetiqueRepository;
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
 * Integration tests for the {@link GenetiqueResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class GenetiqueResourceIT {

    private static final String DEFAULT_COULEUR = "AAAAAAAAAA";
    private static final String UPDATED_COULEUR = "BBBBBBBBBB";

    private static final Integer DEFAULT_TAILLE = 1;
    private static final Integer UPDATED_TAILLE = 2;

    private static final Integer DEFAULT_APTITUDES_LAITIERE = 1;
    private static final Integer UPDATED_APTITUDES_LAITIERE = 2;

    private static final Integer DEFAULT_APTITUDES_BOUCHERES = 1;
    private static final Integer UPDATED_APTITUDES_BOUCHERES = 2;

    private static final Integer DEFAULT_APTITUDES_MATERNELLES = 1;
    private static final Integer UPDATED_APTITUDES_MATERNELLES = 2;

    private static final String ENTITY_API_URL = "/api/genetiques";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private GenetiqueRepository genetiqueRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restGenetiqueMockMvc;

    private Genetique genetique;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Genetique createEntity(EntityManager em) {
        Genetique genetique = new Genetique()
            .couleur(DEFAULT_COULEUR)
            .taille(DEFAULT_TAILLE)
            .aptitudesLaitiere(DEFAULT_APTITUDES_LAITIERE)
            .aptitudesBoucheres(DEFAULT_APTITUDES_BOUCHERES)
            .aptitudesMaternelles(DEFAULT_APTITUDES_MATERNELLES);
        return genetique;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Genetique createUpdatedEntity(EntityManager em) {
        Genetique genetique = new Genetique()
            .couleur(UPDATED_COULEUR)
            .taille(UPDATED_TAILLE)
            .aptitudesLaitiere(UPDATED_APTITUDES_LAITIERE)
            .aptitudesBoucheres(UPDATED_APTITUDES_BOUCHERES)
            .aptitudesMaternelles(UPDATED_APTITUDES_MATERNELLES);
        return genetique;
    }

    @BeforeEach
    public void initTest() {
        genetique = createEntity(em);
    }

    @Test
    @Transactional
    void createGenetique() throws Exception {
        int databaseSizeBeforeCreate = genetiqueRepository.findAll().size();
        // Create the Genetique
        restGenetiqueMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(genetique)))
            .andExpect(status().isCreated());

        // Validate the Genetique in the database
        List<Genetique> genetiqueList = genetiqueRepository.findAll();
        assertThat(genetiqueList).hasSize(databaseSizeBeforeCreate + 1);
        Genetique testGenetique = genetiqueList.get(genetiqueList.size() - 1);
        assertThat(testGenetique.getCouleur()).isEqualTo(DEFAULT_COULEUR);
        assertThat(testGenetique.getTaille()).isEqualTo(DEFAULT_TAILLE);
        assertThat(testGenetique.getAptitudesLaitiere()).isEqualTo(DEFAULT_APTITUDES_LAITIERE);
        assertThat(testGenetique.getAptitudesBoucheres()).isEqualTo(DEFAULT_APTITUDES_BOUCHERES);
        assertThat(testGenetique.getAptitudesMaternelles()).isEqualTo(DEFAULT_APTITUDES_MATERNELLES);
    }

    @Test
    @Transactional
    void createGenetiqueWithExistingId() throws Exception {
        // Create the Genetique with an existing ID
        genetique.setId(1L);

        int databaseSizeBeforeCreate = genetiqueRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restGenetiqueMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(genetique)))
            .andExpect(status().isBadRequest());

        // Validate the Genetique in the database
        List<Genetique> genetiqueList = genetiqueRepository.findAll();
        assertThat(genetiqueList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllGenetiques() throws Exception {
        // Initialize the database
        genetiqueRepository.saveAndFlush(genetique);

        // Get all the genetiqueList
        restGenetiqueMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(genetique.getId().intValue())))
            .andExpect(jsonPath("$.[*].couleur").value(hasItem(DEFAULT_COULEUR)))
            .andExpect(jsonPath("$.[*].taille").value(hasItem(DEFAULT_TAILLE)))
            .andExpect(jsonPath("$.[*].aptitudesLaitiere").value(hasItem(DEFAULT_APTITUDES_LAITIERE)))
            .andExpect(jsonPath("$.[*].aptitudesBoucheres").value(hasItem(DEFAULT_APTITUDES_BOUCHERES)))
            .andExpect(jsonPath("$.[*].aptitudesMaternelles").value(hasItem(DEFAULT_APTITUDES_MATERNELLES)));
    }

    @Test
    @Transactional
    void getGenetique() throws Exception {
        // Initialize the database
        genetiqueRepository.saveAndFlush(genetique);

        // Get the genetique
        restGenetiqueMockMvc
            .perform(get(ENTITY_API_URL_ID, genetique.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(genetique.getId().intValue()))
            .andExpect(jsonPath("$.couleur").value(DEFAULT_COULEUR))
            .andExpect(jsonPath("$.taille").value(DEFAULT_TAILLE))
            .andExpect(jsonPath("$.aptitudesLaitiere").value(DEFAULT_APTITUDES_LAITIERE))
            .andExpect(jsonPath("$.aptitudesBoucheres").value(DEFAULT_APTITUDES_BOUCHERES))
            .andExpect(jsonPath("$.aptitudesMaternelles").value(DEFAULT_APTITUDES_MATERNELLES));
    }

    @Test
    @Transactional
    void getNonExistingGenetique() throws Exception {
        // Get the genetique
        restGenetiqueMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingGenetique() throws Exception {
        // Initialize the database
        genetiqueRepository.saveAndFlush(genetique);

        int databaseSizeBeforeUpdate = genetiqueRepository.findAll().size();

        // Update the genetique
        Genetique updatedGenetique = genetiqueRepository.findById(genetique.getId()).get();
        // Disconnect from session so that the updates on updatedGenetique are not directly saved in db
        em.detach(updatedGenetique);
        updatedGenetique
            .couleur(UPDATED_COULEUR)
            .taille(UPDATED_TAILLE)
            .aptitudesLaitiere(UPDATED_APTITUDES_LAITIERE)
            .aptitudesBoucheres(UPDATED_APTITUDES_BOUCHERES)
            .aptitudesMaternelles(UPDATED_APTITUDES_MATERNELLES);

        restGenetiqueMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedGenetique.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedGenetique))
            )
            .andExpect(status().isOk());

        // Validate the Genetique in the database
        List<Genetique> genetiqueList = genetiqueRepository.findAll();
        assertThat(genetiqueList).hasSize(databaseSizeBeforeUpdate);
        Genetique testGenetique = genetiqueList.get(genetiqueList.size() - 1);
        assertThat(testGenetique.getCouleur()).isEqualTo(UPDATED_COULEUR);
        assertThat(testGenetique.getTaille()).isEqualTo(UPDATED_TAILLE);
        assertThat(testGenetique.getAptitudesLaitiere()).isEqualTo(UPDATED_APTITUDES_LAITIERE);
        assertThat(testGenetique.getAptitudesBoucheres()).isEqualTo(UPDATED_APTITUDES_BOUCHERES);
        assertThat(testGenetique.getAptitudesMaternelles()).isEqualTo(UPDATED_APTITUDES_MATERNELLES);
    }

    @Test
    @Transactional
    void putNonExistingGenetique() throws Exception {
        int databaseSizeBeforeUpdate = genetiqueRepository.findAll().size();
        genetique.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGenetiqueMockMvc
            .perform(
                put(ENTITY_API_URL_ID, genetique.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(genetique))
            )
            .andExpect(status().isBadRequest());

        // Validate the Genetique in the database
        List<Genetique> genetiqueList = genetiqueRepository.findAll();
        assertThat(genetiqueList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchGenetique() throws Exception {
        int databaseSizeBeforeUpdate = genetiqueRepository.findAll().size();
        genetique.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restGenetiqueMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(genetique))
            )
            .andExpect(status().isBadRequest());

        // Validate the Genetique in the database
        List<Genetique> genetiqueList = genetiqueRepository.findAll();
        assertThat(genetiqueList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamGenetique() throws Exception {
        int databaseSizeBeforeUpdate = genetiqueRepository.findAll().size();
        genetique.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restGenetiqueMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(genetique)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Genetique in the database
        List<Genetique> genetiqueList = genetiqueRepository.findAll();
        assertThat(genetiqueList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateGenetiqueWithPatch() throws Exception {
        // Initialize the database
        genetiqueRepository.saveAndFlush(genetique);

        int databaseSizeBeforeUpdate = genetiqueRepository.findAll().size();

        // Update the genetique using partial update
        Genetique partialUpdatedGenetique = new Genetique();
        partialUpdatedGenetique.setId(genetique.getId());

        partialUpdatedGenetique
            .couleur(UPDATED_COULEUR)
            .taille(UPDATED_TAILLE)
            .aptitudesBoucheres(UPDATED_APTITUDES_BOUCHERES)
            .aptitudesMaternelles(UPDATED_APTITUDES_MATERNELLES);

        restGenetiqueMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedGenetique.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedGenetique))
            )
            .andExpect(status().isOk());

        // Validate the Genetique in the database
        List<Genetique> genetiqueList = genetiqueRepository.findAll();
        assertThat(genetiqueList).hasSize(databaseSizeBeforeUpdate);
        Genetique testGenetique = genetiqueList.get(genetiqueList.size() - 1);
        assertThat(testGenetique.getCouleur()).isEqualTo(UPDATED_COULEUR);
        assertThat(testGenetique.getTaille()).isEqualTo(UPDATED_TAILLE);
        assertThat(testGenetique.getAptitudesLaitiere()).isEqualTo(DEFAULT_APTITUDES_LAITIERE);
        assertThat(testGenetique.getAptitudesBoucheres()).isEqualTo(UPDATED_APTITUDES_BOUCHERES);
        assertThat(testGenetique.getAptitudesMaternelles()).isEqualTo(UPDATED_APTITUDES_MATERNELLES);
    }

    @Test
    @Transactional
    void fullUpdateGenetiqueWithPatch() throws Exception {
        // Initialize the database
        genetiqueRepository.saveAndFlush(genetique);

        int databaseSizeBeforeUpdate = genetiqueRepository.findAll().size();

        // Update the genetique using partial update
        Genetique partialUpdatedGenetique = new Genetique();
        partialUpdatedGenetique.setId(genetique.getId());

        partialUpdatedGenetique
            .couleur(UPDATED_COULEUR)
            .taille(UPDATED_TAILLE)
            .aptitudesLaitiere(UPDATED_APTITUDES_LAITIERE)
            .aptitudesBoucheres(UPDATED_APTITUDES_BOUCHERES)
            .aptitudesMaternelles(UPDATED_APTITUDES_MATERNELLES);

        restGenetiqueMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedGenetique.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedGenetique))
            )
            .andExpect(status().isOk());

        // Validate the Genetique in the database
        List<Genetique> genetiqueList = genetiqueRepository.findAll();
        assertThat(genetiqueList).hasSize(databaseSizeBeforeUpdate);
        Genetique testGenetique = genetiqueList.get(genetiqueList.size() - 1);
        assertThat(testGenetique.getCouleur()).isEqualTo(UPDATED_COULEUR);
        assertThat(testGenetique.getTaille()).isEqualTo(UPDATED_TAILLE);
        assertThat(testGenetique.getAptitudesLaitiere()).isEqualTo(UPDATED_APTITUDES_LAITIERE);
        assertThat(testGenetique.getAptitudesBoucheres()).isEqualTo(UPDATED_APTITUDES_BOUCHERES);
        assertThat(testGenetique.getAptitudesMaternelles()).isEqualTo(UPDATED_APTITUDES_MATERNELLES);
    }

    @Test
    @Transactional
    void patchNonExistingGenetique() throws Exception {
        int databaseSizeBeforeUpdate = genetiqueRepository.findAll().size();
        genetique.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGenetiqueMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, genetique.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(genetique))
            )
            .andExpect(status().isBadRequest());

        // Validate the Genetique in the database
        List<Genetique> genetiqueList = genetiqueRepository.findAll();
        assertThat(genetiqueList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchGenetique() throws Exception {
        int databaseSizeBeforeUpdate = genetiqueRepository.findAll().size();
        genetique.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restGenetiqueMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(genetique))
            )
            .andExpect(status().isBadRequest());

        // Validate the Genetique in the database
        List<Genetique> genetiqueList = genetiqueRepository.findAll();
        assertThat(genetiqueList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamGenetique() throws Exception {
        int databaseSizeBeforeUpdate = genetiqueRepository.findAll().size();
        genetique.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restGenetiqueMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(genetique))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Genetique in the database
        List<Genetique> genetiqueList = genetiqueRepository.findAll();
        assertThat(genetiqueList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteGenetique() throws Exception {
        // Initialize the database
        genetiqueRepository.saveAndFlush(genetique);

        int databaseSizeBeforeDelete = genetiqueRepository.findAll().size();

        // Delete the genetique
        restGenetiqueMockMvc
            .perform(delete(ENTITY_API_URL_ID, genetique.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Genetique> genetiqueList = genetiqueRepository.findAll();
        assertThat(genetiqueList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
