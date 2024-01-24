package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.Animal;
import com.mycompany.myapp.repository.AnimalRepository;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link AnimalResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class AnimalResourceIT {

    private static final String DEFAULT_REF = "AAAAAAAAAA";
    private static final String UPDATED_REF = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_AGE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_AGE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_GENRE = "AAAAAAAAAA";
    private static final String UPDATED_GENRE = "BBBBBBBBBB";

    private static final Double DEFAULT_POIDS = 1D;
    private static final Double UPDATED_POIDS = 2D;

    private static final String DEFAULT_REF_MERE = "AAAAAAAAAA";
    private static final String UPDATED_REF_MERE = "BBBBBBBBBB";

    private static final String DEFAULT_REF_PERE = "AAAAAAAAAA";
    private static final String UPDATED_REF_PERE = "BBBBBBBBBB";

    private static final Integer DEFAULT_TYPE = 1;
    private static final Integer UPDATED_TYPE = 2;

    private static final String DEFAULT_RACE = "AAAAAAAAAA";
    private static final String UPDATED_RACE = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/animals";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private AnimalRepository animalRepository;

    @Mock
    private AnimalRepository animalRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAnimalMockMvc;

    private Animal animal;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Animal createEntity(EntityManager em) {
        Animal animal = new Animal()
            .ref(DEFAULT_REF)
            .age(DEFAULT_AGE)
            .genre(DEFAULT_GENRE)
            .poids(DEFAULT_POIDS)
            .refMere(DEFAULT_REF_MERE)
            .refPere(DEFAULT_REF_PERE)
            .type(DEFAULT_TYPE)
            .race(DEFAULT_RACE);
        return animal;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Animal createUpdatedEntity(EntityManager em) {
        Animal animal = new Animal()
            .ref(UPDATED_REF)
            .age(UPDATED_AGE)
            .genre(UPDATED_GENRE)
            .poids(UPDATED_POIDS)
            .refMere(UPDATED_REF_MERE)
            .refPere(UPDATED_REF_PERE)
            .type(UPDATED_TYPE)
            .race(UPDATED_RACE);
        return animal;
    }

    @BeforeEach
    public void initTest() {
        animal = createEntity(em);
    }

    @Test
    @Transactional
    void createAnimal() throws Exception {
        int databaseSizeBeforeCreate = animalRepository.findAll().size();
        // Create the Animal
        restAnimalMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(animal)))
            .andExpect(status().isCreated());

        // Validate the Animal in the database
        List<Animal> animalList = animalRepository.findAll();
        assertThat(animalList).hasSize(databaseSizeBeforeCreate + 1);
        Animal testAnimal = animalList.get(animalList.size() - 1);
        assertThat(testAnimal.getRef()).isEqualTo(DEFAULT_REF);
        assertThat(testAnimal.getAge()).isEqualTo(DEFAULT_AGE);
        assertThat(testAnimal.getGenre()).isEqualTo(DEFAULT_GENRE);
        assertThat(testAnimal.getPoids()).isEqualTo(DEFAULT_POIDS);
        assertThat(testAnimal.getRefMere()).isEqualTo(DEFAULT_REF_MERE);
        assertThat(testAnimal.getRefPere()).isEqualTo(DEFAULT_REF_PERE);
        assertThat(testAnimal.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testAnimal.getRace()).isEqualTo(DEFAULT_RACE);
    }

    @Test
    @Transactional
    void createAnimalWithExistingId() throws Exception {
        // Create the Animal with an existing ID
        animal.setId(1L);

        int databaseSizeBeforeCreate = animalRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restAnimalMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(animal)))
            .andExpect(status().isBadRequest());

        // Validate the Animal in the database
        List<Animal> animalList = animalRepository.findAll();
        assertThat(animalList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllAnimals() throws Exception {
        // Initialize the database
        animalRepository.saveAndFlush(animal);

        // Get all the animalList
        restAnimalMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(animal.getId().intValue())))
            .andExpect(jsonPath("$.[*].ref").value(hasItem(DEFAULT_REF)))
            .andExpect(jsonPath("$.[*].age").value(hasItem(DEFAULT_AGE.toString())))
            .andExpect(jsonPath("$.[*].genre").value(hasItem(DEFAULT_GENRE)))
            .andExpect(jsonPath("$.[*].poids").value(hasItem(DEFAULT_POIDS.doubleValue())))
            .andExpect(jsonPath("$.[*].refMere").value(hasItem(DEFAULT_REF_MERE)))
            .andExpect(jsonPath("$.[*].refPere").value(hasItem(DEFAULT_REF_PERE)))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE)))
            .andExpect(jsonPath("$.[*].race").value(hasItem(DEFAULT_RACE)));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllAnimalsWithEagerRelationshipsIsEnabled() throws Exception {
        when(animalRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restAnimalMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(animalRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllAnimalsWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(animalRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restAnimalMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(animalRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    @Transactional
    void getAnimal() throws Exception {
        // Initialize the database
        animalRepository.saveAndFlush(animal);

        // Get the animal
        restAnimalMockMvc
            .perform(get(ENTITY_API_URL_ID, animal.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(animal.getId().intValue()))
            .andExpect(jsonPath("$.ref").value(DEFAULT_REF))
            .andExpect(jsonPath("$.age").value(DEFAULT_AGE.toString()))
            .andExpect(jsonPath("$.genre").value(DEFAULT_GENRE))
            .andExpect(jsonPath("$.poids").value(DEFAULT_POIDS.doubleValue()))
            .andExpect(jsonPath("$.refMere").value(DEFAULT_REF_MERE))
            .andExpect(jsonPath("$.refPere").value(DEFAULT_REF_PERE))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE))
            .andExpect(jsonPath("$.race").value(DEFAULT_RACE));
    }

    @Test
    @Transactional
    void getNonExistingAnimal() throws Exception {
        // Get the animal
        restAnimalMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingAnimal() throws Exception {
        // Initialize the database
        animalRepository.saveAndFlush(animal);

        int databaseSizeBeforeUpdate = animalRepository.findAll().size();

        // Update the animal
        Animal updatedAnimal = animalRepository.findById(animal.getId()).get();
        // Disconnect from session so that the updates on updatedAnimal are not directly saved in db
        em.detach(updatedAnimal);
        updatedAnimal
            .ref(UPDATED_REF)
            .age(UPDATED_AGE)
            .genre(UPDATED_GENRE)
            .poids(UPDATED_POIDS)
            .refMere(UPDATED_REF_MERE)
            .refPere(UPDATED_REF_PERE)
            .type(UPDATED_TYPE)
            .race(UPDATED_RACE);

        restAnimalMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedAnimal.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedAnimal))
            )
            .andExpect(status().isOk());

        // Validate the Animal in the database
        List<Animal> animalList = animalRepository.findAll();
        assertThat(animalList).hasSize(databaseSizeBeforeUpdate);
        Animal testAnimal = animalList.get(animalList.size() - 1);
        assertThat(testAnimal.getRef()).isEqualTo(UPDATED_REF);
        assertThat(testAnimal.getAge()).isEqualTo(UPDATED_AGE);
        assertThat(testAnimal.getGenre()).isEqualTo(UPDATED_GENRE);
        assertThat(testAnimal.getPoids()).isEqualTo(UPDATED_POIDS);
        assertThat(testAnimal.getRefMere()).isEqualTo(UPDATED_REF_MERE);
        assertThat(testAnimal.getRefPere()).isEqualTo(UPDATED_REF_PERE);
        assertThat(testAnimal.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testAnimal.getRace()).isEqualTo(UPDATED_RACE);
    }

    @Test
    @Transactional
    void putNonExistingAnimal() throws Exception {
        int databaseSizeBeforeUpdate = animalRepository.findAll().size();
        animal.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAnimalMockMvc
            .perform(
                put(ENTITY_API_URL_ID, animal.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(animal))
            )
            .andExpect(status().isBadRequest());

        // Validate the Animal in the database
        List<Animal> animalList = animalRepository.findAll();
        assertThat(animalList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchAnimal() throws Exception {
        int databaseSizeBeforeUpdate = animalRepository.findAll().size();
        animal.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAnimalMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(animal))
            )
            .andExpect(status().isBadRequest());

        // Validate the Animal in the database
        List<Animal> animalList = animalRepository.findAll();
        assertThat(animalList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamAnimal() throws Exception {
        int databaseSizeBeforeUpdate = animalRepository.findAll().size();
        animal.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAnimalMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(animal)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Animal in the database
        List<Animal> animalList = animalRepository.findAll();
        assertThat(animalList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateAnimalWithPatch() throws Exception {
        // Initialize the database
        animalRepository.saveAndFlush(animal);

        int databaseSizeBeforeUpdate = animalRepository.findAll().size();

        // Update the animal using partial update
        Animal partialUpdatedAnimal = new Animal();
        partialUpdatedAnimal.setId(animal.getId());

        partialUpdatedAnimal.age(UPDATED_AGE).refMere(UPDATED_REF_MERE).type(UPDATED_TYPE).race(UPDATED_RACE);

        restAnimalMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAnimal.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedAnimal))
            )
            .andExpect(status().isOk());

        // Validate the Animal in the database
        List<Animal> animalList = animalRepository.findAll();
        assertThat(animalList).hasSize(databaseSizeBeforeUpdate);
        Animal testAnimal = animalList.get(animalList.size() - 1);
        assertThat(testAnimal.getRef()).isEqualTo(DEFAULT_REF);
        assertThat(testAnimal.getAge()).isEqualTo(UPDATED_AGE);
        assertThat(testAnimal.getGenre()).isEqualTo(DEFAULT_GENRE);
        assertThat(testAnimal.getPoids()).isEqualTo(DEFAULT_POIDS);
        assertThat(testAnimal.getRefMere()).isEqualTo(UPDATED_REF_MERE);
        assertThat(testAnimal.getRefPere()).isEqualTo(DEFAULT_REF_PERE);
        assertThat(testAnimal.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testAnimal.getRace()).isEqualTo(UPDATED_RACE);
    }

    @Test
    @Transactional
    void fullUpdateAnimalWithPatch() throws Exception {
        // Initialize the database
        animalRepository.saveAndFlush(animal);

        int databaseSizeBeforeUpdate = animalRepository.findAll().size();

        // Update the animal using partial update
        Animal partialUpdatedAnimal = new Animal();
        partialUpdatedAnimal.setId(animal.getId());

        partialUpdatedAnimal
            .ref(UPDATED_REF)
            .age(UPDATED_AGE)
            .genre(UPDATED_GENRE)
            .poids(UPDATED_POIDS)
            .refMere(UPDATED_REF_MERE)
            .refPere(UPDATED_REF_PERE)
            .type(UPDATED_TYPE)
            .race(UPDATED_RACE);

        restAnimalMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAnimal.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedAnimal))
            )
            .andExpect(status().isOk());

        // Validate the Animal in the database
        List<Animal> animalList = animalRepository.findAll();
        assertThat(animalList).hasSize(databaseSizeBeforeUpdate);
        Animal testAnimal = animalList.get(animalList.size() - 1);
        assertThat(testAnimal.getRef()).isEqualTo(UPDATED_REF);
        assertThat(testAnimal.getAge()).isEqualTo(UPDATED_AGE);
        assertThat(testAnimal.getGenre()).isEqualTo(UPDATED_GENRE);
        assertThat(testAnimal.getPoids()).isEqualTo(UPDATED_POIDS);
        assertThat(testAnimal.getRefMere()).isEqualTo(UPDATED_REF_MERE);
        assertThat(testAnimal.getRefPere()).isEqualTo(UPDATED_REF_PERE);
        assertThat(testAnimal.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testAnimal.getRace()).isEqualTo(UPDATED_RACE);
    }

    @Test
    @Transactional
    void patchNonExistingAnimal() throws Exception {
        int databaseSizeBeforeUpdate = animalRepository.findAll().size();
        animal.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAnimalMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, animal.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(animal))
            )
            .andExpect(status().isBadRequest());

        // Validate the Animal in the database
        List<Animal> animalList = animalRepository.findAll();
        assertThat(animalList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchAnimal() throws Exception {
        int databaseSizeBeforeUpdate = animalRepository.findAll().size();
        animal.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAnimalMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(animal))
            )
            .andExpect(status().isBadRequest());

        // Validate the Animal in the database
        List<Animal> animalList = animalRepository.findAll();
        assertThat(animalList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamAnimal() throws Exception {
        int databaseSizeBeforeUpdate = animalRepository.findAll().size();
        animal.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAnimalMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(animal)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Animal in the database
        List<Animal> animalList = animalRepository.findAll();
        assertThat(animalList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteAnimal() throws Exception {
        // Initialize the database
        animalRepository.saveAndFlush(animal);

        int databaseSizeBeforeDelete = animalRepository.findAll().size();

        // Delete the animal
        restAnimalMockMvc
            .perform(delete(ENTITY_API_URL_ID, animal.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Animal> animalList = animalRepository.findAll();
        assertThat(animalList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
