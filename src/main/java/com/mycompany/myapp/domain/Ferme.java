package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;

/**
 * A Ferme.
 */
@Entity
@Table(name = "ferme")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Ferme implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "adresse")
    private String adresse;

    @Column(name = "taille")
    private Integer taille;

    @OneToMany(mappedBy = "ferme")
    @JsonIgnoreProperties(value = { "genetique", "nutritions", "conditionsDeVie", "maladies", "ferme" }, allowSetters = true)
    private Set<Animal> animals = new HashSet<>();

    @ManyToOne
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Ferme id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAdresse() {
        return this.adresse;
    }

    public Ferme adresse(String adresse) {
        this.setAdresse(adresse);
        return this;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public Integer getTaille() {
        return this.taille;
    }

    public Ferme taille(Integer taille) {
        this.setTaille(taille);
        return this;
    }

    public void setTaille(Integer taille) {
        this.taille = taille;
    }

    public Set<Animal> getAnimals() {
        return this.animals;
    }

    public void setAnimals(Set<Animal> animals) {
        if (this.animals != null) {
            this.animals.forEach(i -> i.setFerme(null));
        }
        if (animals != null) {
            animals.forEach(i -> i.setFerme(this));
        }
        this.animals = animals;
    }

    public Ferme animals(Set<Animal> animals) {
        this.setAnimals(animals);
        return this;
    }

    public Ferme addAnimal(Animal animal) {
        this.animals.add(animal);
        animal.setFerme(this);
        return this;
    }

    public Ferme removeAnimal(Animal animal) {
        this.animals.remove(animal);
        animal.setFerme(null);
        return this;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Ferme user(User user) {
        this.setUser(user);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Ferme)) {
            return false;
        }
        return id != null && id.equals(((Ferme) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Ferme{" +
            "id=" + getId() +
            ", adresse='" + getAdresse() + "'" +
            ", taille=" + getTaille() +
            "}";
    }
}
