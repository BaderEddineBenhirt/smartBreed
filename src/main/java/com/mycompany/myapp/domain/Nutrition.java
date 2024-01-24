package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;

/**
 * A Nutrition.
 */
@Entity
@Table(name = "nutrition")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Nutrition implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "melasse")
    private Integer melasse;

    @Column(name = "paile")
    private Integer paile;

    @Column(name = "tourteau_tournesol")
    private Integer tourteauTournesol;

    @Column(name = "bettrave_sucriere")
    private Integer bettraveSucriere;

    @Column(name = "cmv")
    private Integer cmv;

    @Column(name = "age_min")
    private Integer ageMin;

    @Column(name = "age_max")
    private Integer ageMax;

    @ManyToOne
    @JsonIgnoreProperties(value = { "genetique", "nutritions", "conditionsDeVie", "maladies", "ferme" }, allowSetters = true)
    private Animal animal;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Nutrition id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getMelasse() {
        return this.melasse;
    }

    public Nutrition melasse(Integer melasse) {
        this.setMelasse(melasse);
        return this;
    }

    public void setMelasse(Integer melasse) {
        this.melasse = melasse;
    }

    public Integer getPaile() {
        return this.paile;
    }

    public Nutrition paile(Integer paile) {
        this.setPaile(paile);
        return this;
    }

    public void setPaile(Integer paile) {
        this.paile = paile;
    }

    public Integer getTourteauTournesol() {
        return this.tourteauTournesol;
    }

    public Nutrition tourteauTournesol(Integer tourteauTournesol) {
        this.setTourteauTournesol(tourteauTournesol);
        return this;
    }

    public void setTourteauTournesol(Integer tourteauTournesol) {
        this.tourteauTournesol = tourteauTournesol;
    }

    public Integer getBettraveSucriere() {
        return this.bettraveSucriere;
    }

    public Nutrition bettraveSucriere(Integer bettraveSucriere) {
        this.setBettraveSucriere(bettraveSucriere);
        return this;
    }

    public void setBettraveSucriere(Integer bettraveSucriere) {
        this.bettraveSucriere = bettraveSucriere;
    }

    public Integer getCmv() {
        return this.cmv;
    }

    public Nutrition cmv(Integer cmv) {
        this.setCmv(cmv);
        return this;
    }

    public void setCmv(Integer cmv) {
        this.cmv = cmv;
    }

    public Integer getAgeMin() {
        return this.ageMin;
    }

    public Nutrition ageMin(Integer ageMin) {
        this.setAgeMin(ageMin);
        return this;
    }

    public void setAgeMin(Integer ageMin) {
        this.ageMin = ageMin;
    }

    public Integer getAgeMax() {
        return this.ageMax;
    }

    public Nutrition ageMax(Integer ageMax) {
        this.setAgeMax(ageMax);
        return this;
    }

    public void setAgeMax(Integer ageMax) {
        this.ageMax = ageMax;
    }

    public Animal getAnimal() {
        return this.animal;
    }

    public void setAnimal(Animal animal) {
        this.animal = animal;
    }

    public Nutrition animal(Animal animal) {
        this.setAnimal(animal);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Nutrition)) {
            return false;
        }
        return id != null && id.equals(((Nutrition) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Nutrition{" +
            "id=" + getId() +
            ", melasse=" + getMelasse() +
            ", paile=" + getPaile() +
            ", tourteauTournesol=" + getTourteauTournesol() +
            ", bettraveSucriere=" + getBettraveSucriere() +
            ", cmv=" + getCmv() +
            ", ageMin=" + getAgeMin() +
            ", ageMax=" + getAgeMax() +
            "}";
    }
}
