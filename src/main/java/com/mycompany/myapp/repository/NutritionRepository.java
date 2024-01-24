package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Nutrition;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Nutrition entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NutritionRepository extends JpaRepository<Nutrition, Long> {
    @Query("select a from Nutrition a where a.animal.id = ?1")
    List<Nutrition> getByFerme(Long id);
}
