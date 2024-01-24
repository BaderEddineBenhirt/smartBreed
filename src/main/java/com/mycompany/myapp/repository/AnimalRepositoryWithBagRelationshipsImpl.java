package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Animal;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.IntStream;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.hibernate.annotations.QueryHints;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

/**
 * Utility repository to load bag relationships based on https://vladmihalcea.com/hibernate-multiplebagfetchexception/
 */
public class AnimalRepositoryWithBagRelationshipsImpl implements AnimalRepositoryWithBagRelationships {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Optional<Animal> fetchBagRelationships(Optional<Animal> animal) {
        return animal.map(this::fetchMaladies);
    }

    @Override
    public Page<Animal> fetchBagRelationships(Page<Animal> animals) {
        return new PageImpl<>(fetchBagRelationships(animals.getContent()), animals.getPageable(), animals.getTotalElements());
    }

    @Override
    public List<Animal> fetchBagRelationships(List<Animal> animals) {
        return Optional.of(animals).map(this::fetchMaladies).orElse(Collections.emptyList());
    }

    Animal fetchMaladies(Animal result) {
        return entityManager
            .createQuery("select animal from Animal animal left join fetch animal.maladies where animal is :animal", Animal.class)
            .setParameter("animal", result)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getSingleResult();
    }

    List<Animal> fetchMaladies(List<Animal> animals) {
        HashMap<Object, Integer> order = new HashMap<>();
        IntStream.range(0, animals.size()).forEach(index -> order.put(animals.get(index).getId(), index));
        List<Animal> result = entityManager
            .createQuery("select distinct animal from Animal animal left join fetch animal.maladies where animal in :animals", Animal.class)
            .setParameter("animals", animals)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getResultList();
        Collections.sort(result, (o1, o2) -> Integer.compare(order.get(o1.getId()), order.get(o2.getId())));
        return result;
    }
}
