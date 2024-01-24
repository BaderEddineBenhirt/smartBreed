package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;

/**
 * A ConditionsDeVie.
 */
@Entity
@Table(name = "conditions_de_vie")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ConditionsDeVie implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "age_min")
    private Integer ageMin;

    @Column(name = "age_max")
    private Integer ageMax;

    @Column(name = "temperature")
    private Integer temperature;

    @Column(name = "vitesse_air")
    private Integer vitesseAir;

    @Column(name = "sol")
    private Integer sol;

    @OneToMany(mappedBy = "conditionsDeVie")
    @JsonIgnoreProperties(value = { "genetique", "nutritions", "conditionsDeVie", "maladies", "ferme" }, allowSetters = true)
    private Set<Animal> animals = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public ConditionsDeVie id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getAgeMin() {
        return this.ageMin;
    }

    public ConditionsDeVie ageMin(Integer ageMin) {
        this.setAgeMin(ageMin);
        return this;
    }

    public void setAgeMin(Integer ageMin) {
        this.ageMin = ageMin;
    }

    public Integer getAgeMax() {
        return this.ageMax;
    }

    public ConditionsDeVie ageMax(Integer ageMax) {
        this.setAgeMax(ageMax);
        return this;
    }

    public void setAgeMax(Integer ageMax) {
        this.ageMax = ageMax;
    }

    public Integer getTemperature() {
        return this.temperature;
    }

    public ConditionsDeVie temperature(Integer temperature) {
        this.setTemperature(temperature);
        return this;
    }

    public void setTemperature(Integer temperature) {
        this.temperature = temperature;
    }

    public Integer getVitesseAir() {
        return this.vitesseAir;
    }

    public ConditionsDeVie vitesseAir(Integer vitesseAir) {
        this.setVitesseAir(vitesseAir);
        return this;
    }

    public void setVitesseAir(Integer vitesseAir) {
        this.vitesseAir = vitesseAir;
    }

    public Integer getSol() {
        return this.sol;
    }

    public ConditionsDeVie sol(Integer sol) {
        this.setSol(sol);
        return this;
    }

    public void setSol(Integer sol) {
        this.sol = sol;
    }

    public Set<Animal> getAnimals() {
        return this.animals;
    }

    public void setAnimals(Set<Animal> animals) {
        if (this.animals != null) {
            this.animals.forEach(i -> i.setConditionsDeVie(null));
        }
        if (animals != null) {
            animals.forEach(i -> i.setConditionsDeVie(this));
        }
        this.animals = animals;
    }

    public ConditionsDeVie animals(Set<Animal> animals) {
        this.setAnimals(animals);
        return this;
    }

    public ConditionsDeVie addAnimal(Animal animal) {
        this.animals.add(animal);
        animal.setConditionsDeVie(this);
        return this;
    }

    public ConditionsDeVie removeAnimal(Animal animal) {
        this.animals.remove(animal);
        animal.setConditionsDeVie(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ConditionsDeVie)) {
            return false;
        }
        return id != null && id.equals(((ConditionsDeVie) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ConditionsDeVie{" +
            "id=" + getId() +
            ", ageMin=" + getAgeMin() +
            ", ageMax=" + getAgeMax() +
            ", temperature=" + getTemperature() +
            ", vitesseAir=" + getVitesseAir() +
            ", sol=" + getSol() +
            "}";
    }
}
