package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Animal;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;

public interface AnimalRepositoryWithBagRelationships {
    Optional<Animal> fetchBagRelationships(Optional<Animal> animal);

    List<Animal> fetchBagRelationships(List<Animal> animals);

    Page<Animal> fetchBagRelationships(Page<Animal> animals);
}
