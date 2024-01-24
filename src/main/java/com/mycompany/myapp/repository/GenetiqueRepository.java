package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Genetique;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Genetique entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GenetiqueRepository extends JpaRepository<Genetique, Long> {
    @Query("select a from Genetique a where a.id = ?1")
    List<Genetique> getByFerme(Long id);
}
