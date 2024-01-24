package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Sante;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Sante entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SanteRepository extends JpaRepository<Sante, Long> {
    @Query("select a from Sante a where a.maladie.id = ?1")
    List<Sante> getByFerme(Long id);
}
