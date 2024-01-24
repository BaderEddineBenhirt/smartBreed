package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;

/**
 * A Suivi.
 */
@Entity
@Table(name = "suivi")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Suivi implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "poids_0")
    private Integer poids0;

    @Column(name = "poids_30")
    private Integer poids30;

    @Column(name = "poids_90")
    private Integer poids90;

    @Column(name = "gmq_30")
    private Integer gmq30;

    @Column(name = "gmq_3070")
    private Integer gmq3070;

    @Column(name = "change_dents")
    private Integer changeDents;

    @ManyToOne
    @JsonIgnoreProperties(value = { "genetique", "nutritions", "conditionsDeVie", "maladies", "ferme" }, allowSetters = true)
    private Animal animal;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Suivi id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getPoids0() {
        return this.poids0;
    }

    public Suivi poids0(Integer poids0) {
        this.setPoids0(poids0);
        return this;
    }

    public void setPoids0(Integer poids0) {
        this.poids0 = poids0;
    }

    public Integer getPoids30() {
        return this.poids30;
    }

    public Suivi poids30(Integer poids30) {
        this.setPoids30(poids30);
        return this;
    }

    public void setPoids30(Integer poids30) {
        this.poids30 = poids30;
    }

    public Integer getPoids90() {
        return this.poids90;
    }

    public Suivi poids90(Integer poids90) {
        this.setPoids90(poids90);
        return this;
    }

    public void setPoids90(Integer poids90) {
        this.poids90 = poids90;
    }

    public Integer getGmq30() {
        return this.gmq30;
    }

    public Suivi gmq30(Integer gmq30) {
        this.setGmq30(gmq30);
        return this;
    }

    public void setGmq30(Integer gmq30) {
        this.gmq30 = gmq30;
    }

    public Integer getGmq3070() {
        return this.gmq3070;
    }

    public Suivi gmq3070(Integer gmq3070) {
        this.setGmq3070(gmq3070);
        return this;
    }

    public void setGmq3070(Integer gmq3070) {
        this.gmq3070 = gmq3070;
    }

    public Integer getChangeDents() {
        return this.changeDents;
    }

    public Suivi changeDents(Integer changeDents) {
        this.setChangeDents(changeDents);
        return this;
    }

    public void setChangeDents(Integer changeDents) {
        this.changeDents = changeDents;
    }

    public Animal getAnimal() {
        return this.animal;
    }

    public void setAnimal(Animal animal) {
        this.animal = animal;
    }

    public Suivi animal(Animal animal) {
        this.setAnimal(animal);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Suivi)) {
            return false;
        }
        return id != null && id.equals(((Suivi) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Suivi{" +
            "id=" + getId() +
            ", poids0=" + getPoids0() +
            ", poids30=" + getPoids30() +
            ", poids90=" + getPoids90() +
            ", gmq30=" + getGmq30() +
            ", gmq3070=" + getGmq3070() +
            ", changeDents=" + getChangeDents() +
            "}";
    }
}
