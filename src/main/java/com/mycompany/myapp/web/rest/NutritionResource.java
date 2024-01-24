package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Nutrition;
import com.mycompany.myapp.repository.NutritionRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.Nutrition}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class NutritionResource {

    private final Logger log = LoggerFactory.getLogger(NutritionResource.class);

    private static final String ENTITY_NAME = "nutrition";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final NutritionRepository nutritionRepository;

    public NutritionResource(NutritionRepository nutritionRepository) {
        this.nutritionRepository = nutritionRepository;
    }

    /**
     * {@code POST  /nutritions} : Create a new nutrition.
     *
     * @param nutrition the nutrition to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new nutrition, or with status {@code 400 (Bad Request)} if the nutrition has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/nutritions")
    public ResponseEntity<Nutrition> createNutrition(@RequestBody Nutrition nutrition) throws URISyntaxException {
        log.debug("REST request to save Nutrition : {}", nutrition);
        if (nutrition.getId() != null) {
            throw new BadRequestAlertException("A new nutrition cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Nutrition result = nutritionRepository.save(nutrition);
        return ResponseEntity
            .created(new URI("/api/nutritions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /nutritions/:id} : Updates an existing nutrition.
     *
     * @param id the id of the nutrition to save.
     * @param nutrition the nutrition to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated nutrition,
     * or with status {@code 400 (Bad Request)} if the nutrition is not valid,
     * or with status {@code 500 (Internal Server Error)} if the nutrition couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/nutritions/{id}")
    public ResponseEntity<Nutrition> updateNutrition(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Nutrition nutrition
    ) throws URISyntaxException {
        log.debug("REST request to update Nutrition : {}, {}", id, nutrition);
        if (nutrition.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, nutrition.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!nutritionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Nutrition result = nutritionRepository.save(nutrition);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, nutrition.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /nutritions/:id} : Partial updates given fields of an existing nutrition, field will ignore if it is null
     *
     * @param id the id of the nutrition to save.
     * @param nutrition the nutrition to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated nutrition,
     * or with status {@code 400 (Bad Request)} if the nutrition is not valid,
     * or with status {@code 404 (Not Found)} if the nutrition is not found,
     * or with status {@code 500 (Internal Server Error)} if the nutrition couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/nutritions/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Nutrition> partialUpdateNutrition(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Nutrition nutrition
    ) throws URISyntaxException {
        log.debug("REST request to partial update Nutrition partially : {}, {}", id, nutrition);
        if (nutrition.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, nutrition.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!nutritionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Nutrition> result = nutritionRepository
            .findById(nutrition.getId())
            .map(existingNutrition -> {
                if (nutrition.getMelasse() != null) {
                    existingNutrition.setMelasse(nutrition.getMelasse());
                }
                if (nutrition.getPaile() != null) {
                    existingNutrition.setPaile(nutrition.getPaile());
                }
                if (nutrition.getTourteauTournesol() != null) {
                    existingNutrition.setTourteauTournesol(nutrition.getTourteauTournesol());
                }
                if (nutrition.getBettraveSucriere() != null) {
                    existingNutrition.setBettraveSucriere(nutrition.getBettraveSucriere());
                }
                if (nutrition.getCmv() != null) {
                    existingNutrition.setCmv(nutrition.getCmv());
                }
                if (nutrition.getAgeMin() != null) {
                    existingNutrition.setAgeMin(nutrition.getAgeMin());
                }
                if (nutrition.getAgeMax() != null) {
                    existingNutrition.setAgeMax(nutrition.getAgeMax());
                }

                return existingNutrition;
            })
            .map(nutritionRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, nutrition.getId().toString())
        );
    }

    /**
     * {@code GET  /nutritions} : get all the nutritions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of nutritions in body.
     */
    @GetMapping("/nutritions")
    public List<Nutrition> getAllNutritions() {
        log.debug("REST request to get all Nutritions");
        return nutritionRepository.findAll();
    }

    @GetMapping("/nutritions/anime/{id}")
    public List<Nutrition> getAnimalB(@PathVariable Long id) {
        log.debug("REST request to get Animal : {}", id);
        return nutritionRepository.getByFerme(id);
        }

    /**
     * {@code GET  /nutritions/:id} : get the "id" nutrition.
     *
     * @param id the id of the nutrition to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the nutrition, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/nutritions/{id}")
    public ResponseEntity<Nutrition> getNutrition(@PathVariable Long id) {
        log.debug("REST request to get Nutrition : {}", id);
        Optional<Nutrition> nutrition = nutritionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(nutrition);
    }

    /**
     * {@code DELETE  /nutritions/:id} : delete the "id" nutrition.
     *
     * @param id the id of the nutrition to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/nutritions/{id}")
    public ResponseEntity<Void> deleteNutrition(@PathVariable Long id) {
        log.debug("REST request to delete Nutrition : {}", id);
        nutritionRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
