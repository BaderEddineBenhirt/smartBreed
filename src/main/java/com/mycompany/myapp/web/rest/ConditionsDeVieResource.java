package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.ConditionsDeVie;
import com.mycompany.myapp.repository.ConditionsDeVieRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.ConditionsDeVie}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ConditionsDeVieResource {

    private final Logger log = LoggerFactory.getLogger(ConditionsDeVieResource.class);

    private static final String ENTITY_NAME = "conditionsDeVie";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ConditionsDeVieRepository conditionsDeVieRepository;

    public ConditionsDeVieResource(ConditionsDeVieRepository conditionsDeVieRepository) {
        this.conditionsDeVieRepository = conditionsDeVieRepository;
    }

    /**
     * {@code POST  /conditions-de-vies} : Create a new conditionsDeVie.
     *
     * @param conditionsDeVie the conditionsDeVie to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new conditionsDeVie, or with status {@code 400 (Bad Request)} if the conditionsDeVie has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/conditions-de-vies")
    public ResponseEntity<ConditionsDeVie> createConditionsDeVie(@RequestBody ConditionsDeVie conditionsDeVie) throws URISyntaxException {
        log.debug("REST request to save ConditionsDeVie : {}", conditionsDeVie);
        if (conditionsDeVie.getId() != null) {
            throw new BadRequestAlertException("A new conditionsDeVie cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ConditionsDeVie result = conditionsDeVieRepository.save(conditionsDeVie);
        return ResponseEntity
            .created(new URI("/api/conditions-de-vies/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /conditions-de-vies/:id} : Updates an existing conditionsDeVie.
     *
     * @param id the id of the conditionsDeVie to save.
     * @param conditionsDeVie the conditionsDeVie to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated conditionsDeVie,
     * or with status {@code 400 (Bad Request)} if the conditionsDeVie is not valid,
     * or with status {@code 500 (Internal Server Error)} if the conditionsDeVie couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/conditions-de-vies/{id}")
    public ResponseEntity<ConditionsDeVie> updateConditionsDeVie(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ConditionsDeVie conditionsDeVie
    ) throws URISyntaxException {
        log.debug("REST request to update ConditionsDeVie : {}, {}", id, conditionsDeVie);
        if (conditionsDeVie.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, conditionsDeVie.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!conditionsDeVieRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        ConditionsDeVie result = conditionsDeVieRepository.save(conditionsDeVie);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, conditionsDeVie.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /conditions-de-vies/:id} : Partial updates given fields of an existing conditionsDeVie, field will ignore if it is null
     *
     * @param id the id of the conditionsDeVie to save.
     * @param conditionsDeVie the conditionsDeVie to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated conditionsDeVie,
     * or with status {@code 400 (Bad Request)} if the conditionsDeVie is not valid,
     * or with status {@code 404 (Not Found)} if the conditionsDeVie is not found,
     * or with status {@code 500 (Internal Server Error)} if the conditionsDeVie couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/conditions-de-vies/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ConditionsDeVie> partialUpdateConditionsDeVie(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ConditionsDeVie conditionsDeVie
    ) throws URISyntaxException {
        log.debug("REST request to partial update ConditionsDeVie partially : {}, {}", id, conditionsDeVie);
        if (conditionsDeVie.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, conditionsDeVie.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!conditionsDeVieRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ConditionsDeVie> result = conditionsDeVieRepository
            .findById(conditionsDeVie.getId())
            .map(existingConditionsDeVie -> {
                if (conditionsDeVie.getAgeMin() != null) {
                    existingConditionsDeVie.setAgeMin(conditionsDeVie.getAgeMin());
                }
                if (conditionsDeVie.getAgeMax() != null) {
                    existingConditionsDeVie.setAgeMax(conditionsDeVie.getAgeMax());
                }
                if (conditionsDeVie.getTemperature() != null) {
                    existingConditionsDeVie.setTemperature(conditionsDeVie.getTemperature());
                }
                if (conditionsDeVie.getVitesseAir() != null) {
                    existingConditionsDeVie.setVitesseAir(conditionsDeVie.getVitesseAir());
                }
                if (conditionsDeVie.getSol() != null) {
                    existingConditionsDeVie.setSol(conditionsDeVie.getSol());
                }

                return existingConditionsDeVie;
            })
            .map(conditionsDeVieRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, conditionsDeVie.getId().toString())
        );
    }

    /**
     * {@code GET  /conditions-de-vies} : get all the conditionsDeVies.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of conditionsDeVies in body.
     */
    @GetMapping("/conditions-de-vies")
    public List<ConditionsDeVie> getAllConditionsDeVies() {
        log.debug("REST request to get all ConditionsDeVies");
        return conditionsDeVieRepository.findAll();
    }

    /**
     * {@code GET  /conditions-de-vies/:id} : get the "id" conditionsDeVie.
     *
     * @param id the id of the conditionsDeVie to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the conditionsDeVie, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/conditions-de-vies/{id}")
    public ResponseEntity<ConditionsDeVie> getConditionsDeVie(@PathVariable Long id) {
        log.debug("REST request to get ConditionsDeVie : {}", id);
        Optional<ConditionsDeVie> conditionsDeVie = conditionsDeVieRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(conditionsDeVie);
    }

    @GetMapping("/conditions-de-vies/anime/{id}")
    public List<ConditionsDeVie> getAnimalB(@PathVariable Long id) {
        log.debug("REST request to get Condition de vie : {}", id);
        return conditionsDeVieRepository.getByFerme(id);
        }

    /**
     * {@code DELETE  /conditions-de-vies/:id} : delete the "id" conditionsDeVie.
     *
     * @param id the id of the conditionsDeVie to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/conditions-de-vies/{id}")
    public ResponseEntity<Void> deleteConditionsDeVie(@PathVariable Long id) {
        log.debug("REST request to delete ConditionsDeVie : {}", id);
        conditionsDeVieRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
