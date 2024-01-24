package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Animal;
import com.mycompany.myapp.repository.AnimalRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.Animal}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class AnimalResource {

    private final Logger log = LoggerFactory.getLogger(AnimalResource.class);

    private static final String ENTITY_NAME = "animal";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AnimalRepository animalRepository;

    public AnimalResource(AnimalRepository animalRepository) {
        this.animalRepository = animalRepository;
    }

    /**
     * {@code POST  /animals} : Create a new animal.
     *
     * @param animal the animal to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new animal, or with status {@code 400 (Bad Request)} if the animal has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/animals")
    public ResponseEntity<Animal> createAnimal(@RequestBody Animal animal) throws URISyntaxException {
        log.debug("REST request to save Animal : {}", animal);
        if (animal.getId() != null) {
            throw new BadRequestAlertException("A new animal cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Animal result = animalRepository.save(animal);
        return ResponseEntity
            .created(new URI("/api/animals/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /animals/:id} : Updates an existing animal.
     *
     * @param id the id of the animal to save.
     * @param animal the animal to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated animal,
     * or with status {@code 400 (Bad Request)} if the animal is not valid,
     * or with status {@code 500 (Internal Server Error)} if the animal couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/animals/{id}")
    public ResponseEntity<Animal> updateAnimal(@PathVariable(value = "id", required = false) final Long id, @RequestBody Animal animal)
        throws URISyntaxException {
        log.debug("REST request to update Animal : {}, {}", id, animal);
        if (animal.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, animal.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!animalRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Animal result = animalRepository.save(animal);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, animal.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /animals/:id} : Partial updates given fields of an existing animal, field will ignore if it is null
     *
     * @param id the id of the animal to save.
     * @param animal the animal to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated animal,
     * or with status {@code 400 (Bad Request)} if the animal is not valid,
     * or with status {@code 404 (Not Found)} if the animal is not found,
     * or with status {@code 500 (Internal Server Error)} if the animal couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/animals/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Animal> partialUpdateAnimal(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Animal animal
    ) throws URISyntaxException {
        log.debug("REST request to partial update Animal partially : {}, {}", id, animal);
        if (animal.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, animal.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!animalRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Animal> result = animalRepository
            .findById(animal.getId())
            .map(existingAnimal -> {
                if (animal.getRef() != null) {
                    existingAnimal.setRef(animal.getRef());
                }
                if (animal.getAge() != null) {
                    existingAnimal.setAge(animal.getAge());
                }
                if (animal.getGenre() != null) {
                    existingAnimal.setGenre(animal.getGenre());
                }
                if (animal.getPoids() != null) {
                    existingAnimal.setPoids(animal.getPoids());
                }
                if (animal.getRefMere() != null) {
                    existingAnimal.setRefMere(animal.getRefMere());
                }
                if (animal.getRefPere() != null) {
                    existingAnimal.setRefPere(animal.getRefPere());
                }
                if (animal.getType() != null) {
                    existingAnimal.setType(animal.getType());
                }
                if (animal.getRace() != null) {
                    existingAnimal.setRace(animal.getRace());
                }

                return existingAnimal;
            })
            .map(animalRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, animal.getId().toString())
        );
    }

    /**
     * {@code GET  /animals} : get all the animals.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of animals in body.
     */
    @GetMapping("/animals")
    public List<Animal> getAllAnimals(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Animals");
        if (eagerload) {
            return animalRepository.findAllWithEagerRelationships();
        } else {
            return animalRepository.findAll();
        }
    }

    /**
     * {@code GET  /animals/:id} : get the "id" animal.
     *
     * @param id the id of the animal to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the animal, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/animals/{id}")
    public ResponseEntity<Animal> getAnimal(@PathVariable Long id) {
        log.debug("REST request to get Animal : {}", id);
        Optional<Animal> animal = animalRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(animal);
    }

    @GetMapping("/animals/anime/{id}")
    public List<Animal> getAnimalB(@PathVariable Long id) {
        log.debug("REST request to get Animal : {}", id);
        return animalRepository.getByFerme(id);
        }
   

    /**
     * {@code DELETE  /animals/:id} : delete the "id" animal.
     *
     * @param id the id of the animal to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/animals/{id}")
    public ResponseEntity<Void> deleteAnimal(@PathVariable Long id) {
        log.debug("REST request to delete Animal : {}", id);
        animalRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
