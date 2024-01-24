package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Suivi;
import com.mycompany.myapp.repository.SuiviRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.Suivi}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class SuiviResource {

    private final Logger log = LoggerFactory.getLogger(SuiviResource.class);

    private static final String ENTITY_NAME = "suivi";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SuiviRepository suiviRepository;

    public SuiviResource(SuiviRepository suiviRepository) {
        this.suiviRepository = suiviRepository;
    }

    /**
     * {@code POST  /suivis} : Create a new suivi.
     *
     * @param suivi the suivi to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new suivi, or with status {@code 400 (Bad Request)} if the suivi has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/suivis")
    public ResponseEntity<Suivi> createSuivi(@RequestBody Suivi suivi) throws URISyntaxException {
        log.debug("REST request to save Suivi : {}", suivi);
        if (suivi.getId() != null) {
            throw new BadRequestAlertException("A new suivi cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Suivi result = suiviRepository.save(suivi);
        return ResponseEntity
            .created(new URI("/api/suivis/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /suivis/:id} : Updates an existing suivi.
     *
     * @param id the id of the suivi to save.
     * @param suivi the suivi to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated suivi,
     * or with status {@code 400 (Bad Request)} if the suivi is not valid,
     * or with status {@code 500 (Internal Server Error)} if the suivi couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/suivis/{id}")
    public ResponseEntity<Suivi> updateSuivi(@PathVariable(value = "id", required = false) final Long id, @RequestBody Suivi suivi)
        throws URISyntaxException {
        log.debug("REST request to update Suivi : {}, {}", id, suivi);
        if (suivi.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, suivi.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!suiviRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Suivi result = suiviRepository.save(suivi);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, suivi.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /suivis/:id} : Partial updates given fields of an existing suivi, field will ignore if it is null
     *
     * @param id the id of the suivi to save.
     * @param suivi the suivi to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated suivi,
     * or with status {@code 400 (Bad Request)} if the suivi is not valid,
     * or with status {@code 404 (Not Found)} if the suivi is not found,
     * or with status {@code 500 (Internal Server Error)} if the suivi couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/suivis/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Suivi> partialUpdateSuivi(@PathVariable(value = "id", required = false) final Long id, @RequestBody Suivi suivi)
        throws URISyntaxException {
        log.debug("REST request to partial update Suivi partially : {}, {}", id, suivi);
        if (suivi.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, suivi.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!suiviRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Suivi> result = suiviRepository
            .findById(suivi.getId())
            .map(existingSuivi -> {
                if (suivi.getPoids0() != null) {
                    existingSuivi.setPoids0(suivi.getPoids0());
                }
                if (suivi.getPoids30() != null) {
                    existingSuivi.setPoids30(suivi.getPoids30());
                }
                if (suivi.getPoids90() != null) {
                    existingSuivi.setPoids90(suivi.getPoids90());
                }
                if (suivi.getGmq30() != null) {
                    existingSuivi.setGmq30(suivi.getGmq30());
                }
                if (suivi.getGmq3070() != null) {
                    existingSuivi.setGmq3070(suivi.getGmq3070());
                }
                if (suivi.getChangeDents() != null) {
                    existingSuivi.setChangeDents(suivi.getChangeDents());
                }

                return existingSuivi;
            })
            .map(suiviRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, suivi.getId().toString())
        );
    }

    /**
     * {@code GET  /suivis} : get all the suivis.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of suivis in body.
     */
    @GetMapping("/suivis")
    public List<Suivi> getAllSuivis() {
        log.debug("REST request to get all Suivis");
        return suiviRepository.findAll();
    }

    /**
     * {@code GET  /suivis/:id} : get the "id" suivi.
     *
     * @param id the id of the suivi to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the suivi, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/suivis/{id}")
    public ResponseEntity<Suivi> getSuivi(@PathVariable Long id) {
        log.debug("REST request to get Suivi : {}", id);
        Optional<Suivi> suivi = suiviRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(suivi);
    }
    @GetMapping("/suivis/anime/{id}")
    public List<Suivi> getAnimalB(@PathVariable Long id) {
        log.debug("REST request to get Animal : {}", id);
        return suiviRepository.getByFerme(id);
        }

    /**
     * {@code DELETE  /suivis/:id} : delete the "id" suivi.
     *
     * @param id the id of the suivi to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/suivis/{id}")
    public ResponseEntity<Void> deleteSuivi(@PathVariable Long id) {
        log.debug("REST request to delete Suivi : {}", id);
        suiviRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
