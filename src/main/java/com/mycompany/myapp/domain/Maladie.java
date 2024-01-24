package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;

/**
 * A Maladie.
 */
@Entity
@Table(name = "maladie")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Maladie implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "nom_maladie")
    private String nomMaladie;

    @Column(name = "symptomes")
    private String symptomes;

    @OneToMany(mappedBy = "maladie")
    @JsonIgnoreProperties(value = { "maladie" }, allowSetters = true)
    private Set<Sante> santes = new HashSet<>();

    @ManyToMany(mappedBy = "maladies")
    @JsonIgnoreProperties(value = { "genetique", "nutritions", "conditionsDeVie", "maladies", "ferme" }, allowSetters = true)
    private Set<Animal> animals = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Maladie id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomMaladie() {
        return this.nomMaladie;
    }

    public Maladie nomMaladie(String nomMaladie) {
        this.setNomMaladie(nomMaladie);
        return this;
    }

    public void setNomMaladie(String nomMaladie) {
        this.nomMaladie = nomMaladie;
    }

    public String getSymptomes() {
        return this.symptomes;
    }

    public Maladie symptomes(String symptomes) {
        this.setSymptomes(symptomes);
        return this;
    }

    public void setSymptomes(String symptomes) {
        this.symptomes = symptomes;
    }

    public Set<Sante> getSantes() {
        return this.santes;
    }

    public void setSantes(Set<Sante> santes) {
        if (this.santes != null) {
            this.santes.forEach(i -> i.setMaladie(null));
        }
        if (santes != null) {
            santes.forEach(i -> i.setMaladie(this));
        }
        this.santes = santes;
    }

    public Maladie santes(Set<Sante> santes) {
        this.setSantes(santes);
        return this;
    }

    public Maladie addSante(Sante sante) {
        this.santes.add(sante);
        sante.setMaladie(this);
        return this;
    }

    public Maladie removeSante(Sante sante) {
        this.santes.remove(sante);
        sante.setMaladie(null);
        return this;
    }

    public Set<Animal> getAnimals() {
        return this.animals;
    }

    public void setAnimals(Set<Animal> animals) {
        if (this.animals != null) {
            this.animals.forEach(i -> i.removeMaladie(this));
        }
        if (animals != null) {
            animals.forEach(i -> i.addMaladie(this));
        }
        this.animals = animals;
    }

    public Maladie animals(Set<Animal> animals) {
        this.setAnimals(animals);
        return this;
    }

    public Maladie addAnimal(Animal animal) {
        this.animals.add(animal);
        animal.getMaladies().add(this);
        return this;
    }

    public Maladie removeAnimal(Animal animal) {
        this.animals.remove(animal);
        animal.getMaladies().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Maladie)) {
            return false;
        }
        return id != null && id.equals(((Maladie) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Maladie{" +
            "id=" + getId() +
            ", nomMaladie='" + getNomMaladie() + "'" +
            ", symptomes='" + getSymptomes() + "'" +
            "}";
    }
}
