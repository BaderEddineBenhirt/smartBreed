package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Animal;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Animal entity.
 *
 * When extending this class, extend AnimalRepositoryWithBagRelationships too.
 * For more information refer to https://github.com/jhipster/generator-jhipster/issues/17990.
 */
@Repository
public interface AnimalRepository extends AnimalRepositoryWithBagRelationships, JpaRepository<Animal, Long> {
    @Query("select a from Animal a where a.ferme.id = ?1")
    List<Animal> getByFerme(Long id);
    default Optional<Animal> findOneWithEagerRelationships(Long id) {
        return this.fetchBagRelationships(this.findById(id));
    }

    default List<Animal> findAllWithEagerRelationships() {
        return this.fetchBagRelationships(this.findAll());
    }

    default Page<Animal> findAllWithEagerRelationships(Pageable pageable) {
        return this.fetchBagRelationships(this.findAll(pageable));
    }
}
