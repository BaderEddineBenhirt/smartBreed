package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Suivi;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Suivi entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SuiviRepository extends JpaRepository<Suivi, Long> {
    @Query("select a from Suivi a where a.animal.id = ?1")
    List<Suivi> getByFerme(Long id);
}
