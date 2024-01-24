package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Genetique;
import com.mycompany.myapp.repository.GenetiqueRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.Genetique}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class GenetiqueResource {

    private final Logger log = LoggerFactory.getLogger(GenetiqueResource.class);

    private static final String ENTITY_NAME = "genetique";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final GenetiqueRepository genetiqueRepository;

    public GenetiqueResource(GenetiqueRepository genetiqueRepository) {
        this.genetiqueRepository = genetiqueRepository;
    }

    /**
     * {@code POST  /genetiques} : Create a new genetique.
     *
     * @param genetique the genetique to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new genetique, or with status {@code 400 (Bad Request)} if the genetique has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/genetiques")
    public ResponseEntity<Genetique> createGenetique(@RequestBody Genetique genetique) throws URISyntaxException {
        log.debug("REST request to save Genetique : {}", genetique);
        if (genetique.getId() != null) {
            throw new BadRequestAlertException("A new genetique cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Genetique result = genetiqueRepository.save(genetique);
        return ResponseEntity
            .created(new URI("/api/genetiques/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /genetiques/:id} : Updates an existing genetique.
     *
     * @param id the id of the genetique to save.
     * @param genetique the genetique to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated genetique,
     * or with status {@code 400 (Bad Request)} if the genetique is not valid,
     * or with status {@code 500 (Internal Server Error)} if the genetique couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/genetiques/{id}")
    public ResponseEntity<Genetique> updateGenetique(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Genetique genetique
    ) throws URISyntaxException {
        log.debug("REST request to update Genetique : {}, {}", id, genetique);
        if (genetique.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, genetique.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!genetiqueRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Genetique result = genetiqueRepository.save(genetique);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, genetique.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /genetiques/:id} : Partial updates given fields of an existing genetique, field will ignore if it is null
     *
     * @param id the id of the genetique to save.
     * @param genetique the genetique to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated genetique,
     * or with status {@code 400 (Bad Request)} if the genetique is not valid,
     * or with status {@code 404 (Not Found)} if the genetique is not found,
     * or with status {@code 500 (Internal Server Error)} if the genetique couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/genetiques/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Genetique> partialUpdateGenetique(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Genetique genetique
    ) throws URISyntaxException {
        log.debug("REST request to partial update Genetique partially : {}, {}", id, genetique);
        if (genetique.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, genetique.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!genetiqueRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Genetique> result = genetiqueRepository
            .findById(genetique.getId())
            .map(existingGenetique -> {
                if (genetique.getCouleur() != null) {
                    existingGenetique.setCouleur(genetique.getCouleur());
                }
                if (genetique.getTaille() != null) {
                    existingGenetique.setTaille(genetique.getTaille());
                }
                if (genetique.getAptitudesLaitiere() != null) {
                    existingGenetique.setAptitudesLaitiere(genetique.getAptitudesLaitiere());
                }
                if (genetique.getAptitudesBoucheres() != null) {
                    existingGenetique.setAptitudesBoucheres(genetique.getAptitudesBoucheres());
                }
                if (genetique.getAptitudesMaternelles() != null) {
                    existingGenetique.setAptitudesMaternelles(genetique.getAptitudesMaternelles());
                }

                return existingGenetique;
            })
            .map(genetiqueRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, genetique.getId().toString())
        );
    }

    /**
     * {@code GET  /genetiques} : get all the genetiques.
     *
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of genetiques in body.
     */
    @GetMapping("/genetiques")
    public List<Genetique> getAllGenetiques(@RequestParam(required = false) String filter) {
        if ("animal-is-null".equals(filter)) {
            log.debug("REST request to get all Genetiques where animal is null");
            return StreamSupport
                .stream(genetiqueRepository.findAll().spliterator(), false)
                .filter(genetique -> genetique.getAnimal() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all Genetiques");
        return genetiqueRepository.findAll();
    }

    /**
     * {@code GET  /genetiques/:id} : get the "id" genetique.
     *
     * @param id the id of the genetique to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the genetique, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/genetiques/{id}")
    public ResponseEntity<Genetique> getGenetique(@PathVariable Long id) {
        log.debug("REST request to get Genetique : {}", id);
        Optional<Genetique> genetique = genetiqueRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(genetique);
    }

    @GetMapping("/genetiques/anime/{id}")
    public List<Genetique> getAnimalB(@PathVariable Long id) {
        log.debug("REST request to get Animal : {}", id);
        return genetiqueRepository.getByFerme(id);
        }

    /**
     * {@code DELETE  /genetiques/:id} : delete the "id" genetique.
     *
     * @param id the id of the genetique to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/genetiques/{id}")
    public ResponseEntity<Void> deleteGenetique(@PathVariable Long id) {
        log.debug("REST request to delete Genetique : {}", id);
        genetiqueRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
