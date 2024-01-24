package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;

/**
 * A Genetique.
 */
@Entity
@Table(name = "genetique")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Genetique implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "couleur")
    private String couleur;

    @Column(name = "taille")
    private Integer taille;

    @Column(name = "aptitudes_laitiere")
    private Integer aptitudesLaitiere;

    @Column(name = "aptitudes_boucheres")
    private Integer aptitudesBoucheres;

    @Column(name = "aptitudes_maternelles")
    private Integer aptitudesMaternelles;

    @JsonIgnoreProperties(value = { "genetique", "nutritions", "conditionsDeVie", "maladies", "ferme" }, allowSetters = true)
    @OneToOne(mappedBy = "genetique")
    private Animal animal;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Genetique id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCouleur() {
        return this.couleur;
    }

    public Genetique couleur(String couleur) {
        this.setCouleur(couleur);
        return this;
    }

    public void setCouleur(String couleur) {
        this.couleur = couleur;
    }

    public Integer getTaille() {
        return this.taille;
    }

    public Genetique taille(Integer taille) {
        this.setTaille(taille);
        return this;
    }

    public void setTaille(Integer taille) {
        this.taille = taille;
    }

    public Integer getAptitudesLaitiere() {
        return this.aptitudesLaitiere;
    }

    public Genetique aptitudesLaitiere(Integer aptitudesLaitiere) {
        this.setAptitudesLaitiere(aptitudesLaitiere);
        return this;
    }

    public void setAptitudesLaitiere(Integer aptitudesLaitiere) {
        this.aptitudesLaitiere = aptitudesLaitiere;
    }

    public Integer getAptitudesBoucheres() {
        return this.aptitudesBoucheres;
    }

    public Genetique aptitudesBoucheres(Integer aptitudesBoucheres) {
        this.setAptitudesBoucheres(aptitudesBoucheres);
        return this;
    }

    public void setAptitudesBoucheres(Integer aptitudesBoucheres) {
        this.aptitudesBoucheres = aptitudesBoucheres;
    }

    public Integer getAptitudesMaternelles() {
        return this.aptitudesMaternelles;
    }

    public Genetique aptitudesMaternelles(Integer aptitudesMaternelles) {
        this.setAptitudesMaternelles(aptitudesMaternelles);
        return this;
    }

    public void setAptitudesMaternelles(Integer aptitudesMaternelles) {
        this.aptitudesMaternelles = aptitudesMaternelles;
    }

    public Animal getAnimal() {
        return this.animal;
    }

    public void setAnimal(Animal animal) {
        if (this.animal != null) {
            this.animal.setGenetique(null);
        }
        if (animal != null) {
            animal.setGenetique(this);
        }
        this.animal = animal;
    }

    public Genetique animal(Animal animal) {
        this.setAnimal(animal);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Genetique)) {
            return false;
        }
        return id != null && id.equals(((Genetique) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Genetique{" +
            "id=" + getId() +
            ", couleur='" + getCouleur() + "'" +
            ", taille=" + getTaille() +
            ", aptitudesLaitiere=" + getAptitudesLaitiere() +
            ", aptitudesBoucheres=" + getAptitudesBoucheres() +
            ", aptitudesMaternelles=" + getAptitudesMaternelles() +
            "}";
    }
}
