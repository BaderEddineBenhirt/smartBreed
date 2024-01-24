package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Sante;
import com.mycompany.myapp.repository.SanteRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.Sante}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class SanteResource {

    private final Logger log = LoggerFactory.getLogger(SanteResource.class);

    private static final String ENTITY_NAME = "sante";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SanteRepository santeRepository;

    public SanteResource(SanteRepository santeRepository) {
        this.santeRepository = santeRepository;
    }

    /**
     * {@code POST  /santes} : Create a new sante.
     *
     * @param sante the sante to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new sante, or with status {@code 400 (Bad Request)} if the sante has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/santes")
    public ResponseEntity<Sante> createSante(@RequestBody Sante sante) throws URISyntaxException {
        log.debug("REST request to save Sante : {}", sante);
        if (sante.getId() != null) {
            throw new BadRequestAlertException("A new sante cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Sante result = santeRepository.save(sante);
        return ResponseEntity
            .created(new URI("/api/santes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /santes/:id} : Updates an existing sante.
     *
     * @param id the id of the sante to save.
     * @param sante the sante to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated sante,
     * or with status {@code 400 (Bad Request)} if the sante is not valid,
     * or with status {@code 500 (Internal Server Error)} if the sante couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/santes/{id}")
    public ResponseEntity<Sante> updateSante(@PathVariable(value = "id", required = false) final Long id, @RequestBody Sante sante)
        throws URISyntaxException {
        log.debug("REST request to update Sante : {}, {}", id, sante);
        if (sante.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, sante.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!santeRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Sante result = santeRepository.save(sante);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, sante.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /santes/:id} : Partial updates given fields of an existing sante, field will ignore if it is null
     *
     * @param id the id of the sante to save.
     * @param sante the sante to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated sante,
     * or with status {@code 400 (Bad Request)} if the sante is not valid,
     * or with status {@code 404 (Not Found)} if the sante is not found,
     * or with status {@code 500 (Internal Server Error)} if the sante couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/santes/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Sante> partialUpdateSante(@PathVariable(value = "id", required = false) final Long id, @RequestBody Sante sante)
        throws URISyntaxException {
        log.debug("REST request to partial update Sante partially : {}, {}", id, sante);
        if (sante.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, sante.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!santeRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Sante> result = santeRepository
            .findById(sante.getId())
            .map(existingSante -> {
                if (sante.getTraitementsPreventifs() != null) {
                    existingSante.setTraitementsPreventifs(sante.getTraitementsPreventifs());
                }
                if (sante.getSoins() != null) {
                    existingSante.setSoins(sante.getSoins());
                }
                if (sante.getVaccins() != null) {
                    existingSante.setVaccins(sante.getVaccins());
                }

                return existingSante;
            })
            .map(santeRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, sante.getId().toString())
        );
    }

    /**
     * {@code GET  /santes} : get all the santes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of santes in body.
     */
    @GetMapping("/santes")
    public List<Sante> getAllSantes() {
        log.debug("REST request to get all Santes");
        return santeRepository.findAll();
    }

    /**
     * {@code GET  /santes/:id} : get the "id" sante.
     *
     * @param id the id of the sante to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the sante, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/santes/{id}")
    public ResponseEntity<Sante> getSante(@PathVariable Long id) {
        log.debug("REST request to get Sante : {}", id);
        Optional<Sante> sante = santeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(sante);
    }

    @GetMapping("/santes/anime/{id}")
    public List<Sante> getAnimalB(@PathVariable Long id) {
        log.debug("REST request to get Animal : {}", id);
        return santeRepository.getByFerme(id);
        }

    /**
     * {@code DELETE  /santes/:id} : delete the "id" sante.
     *
     * @param id the id of the sante to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/santes/{id}")
    public ResponseEntity<Void> deleteSante(@PathVariable Long id) {
        log.debug("REST request to delete Sante : {}", id);
        santeRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
