package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Maladie;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Maladie entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MaladieRepository extends JpaRepository<Maladie, Long> {
    @Query("select a from Maladie a where a.id = ?1")
    Maladie getByFerme(Long id);
}
