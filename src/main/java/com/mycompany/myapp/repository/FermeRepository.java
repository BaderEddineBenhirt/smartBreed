package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Ferme;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Ferme entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FermeRepository extends JpaRepository<Ferme, Long> {
    @Query("select ferme from Ferme ferme where ferme.user.login = ?#{principal.username}")
    List<Ferme> findByUserIsCurrentUser();
}
