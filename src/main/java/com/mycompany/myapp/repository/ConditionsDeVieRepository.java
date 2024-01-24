package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.ConditionsDeVie;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the ConditionsDeVie entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ConditionsDeVieRepository extends JpaRepository<ConditionsDeVie, Long> {
    @Query("select a from ConditionsDeVie a where a.id = ?1")
    List<ConditionsDeVie> getByFerme(Long id);
}
