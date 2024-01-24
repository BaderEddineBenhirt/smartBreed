package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;

/**
 * A Animal.
 */
@Entity
@Table(name = "animal")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Animal implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "ref")
    private String ref;

    @Column(name = "age")
    private LocalDate age;

    @Column(name = "genre")
    private String genre;

    @Column(name = "poids")
    private Double poids;

    @Column(name = "ref_mere")
    private String refMere;

    @Column(name = "ref_pere")
    private String refPere;

    @Column(name = "type")
    private Integer type;

    @Column(name = "race")
    private String race;

    @JsonIgnoreProperties(value = { "animal" }, allowSetters = true)
    @OneToOne
    @JoinColumn(unique = true)
    private Genetique genetique;

    @OneToMany(mappedBy = "animal")
    @JsonIgnoreProperties(value = { "animal" }, allowSetters = true)
    private Set<Nutrition> nutritions = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "animals" }, allowSetters = true)
    private ConditionsDeVie conditionsDeVie;

    @ManyToMany
    @JoinTable(
        name = "rel_animal__maladie",
        joinColumns = @JoinColumn(name = "animal_id"),
        inverseJoinColumns = @JoinColumn(name = "maladie_id")
    )
    @JsonIgnoreProperties(value = { "santes", "animals" }, allowSetters = true)
    private Set<Maladie> maladies = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "animals", "user" }, allowSetters = true)
    private Ferme ferme;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Animal id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRef() {
        return this.ref;
    }

    public Animal ref(String ref) {
        this.setRef(ref);
        return this;
    }

    public void setRef(String ref) {
        this.ref = ref;
    }

    public LocalDate getAge() {
        return this.age;
    }

    public Animal age(LocalDate age) {
        this.setAge(age);
        return this;
    }

    public void setAge(LocalDate age) {
        this.age = age;
    }

    public String getGenre() {
        return this.genre;
    }

    public Animal genre(String genre) {
        this.setGenre(genre);
        return this;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public Double getPoids() {
        return this.poids;
    }

    public Animal poids(Double poids) {
        this.setPoids(poids);
        return this;
    }

    public void setPoids(Double poids) {
        this.poids = poids;
    }

    public String getRefMere() {
        return this.refMere;
    }

    public Animal refMere(String refMere) {
        this.setRefMere(refMere);
        return this;
    }

    public void setRefMere(String refMere) {
        this.refMere = refMere;
    }

    public String getRefPere() {
        return this.refPere;
    }

    public Animal refPere(String refPere) {
        this.setRefPere(refPere);
        return this;
    }

    public void setRefPere(String refPere) {
        this.refPere = refPere;
    }

    public Integer getType() {
        return this.type;
    }

    public Animal type(Integer type) {
        this.setType(type);
        return this;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public String getRace() {
        return this.race;
    }

    public Animal race(String race) {
        this.setRace(race);
        return this;
    }

    public void setRace(String race) {
        this.race = race;
    }

    public Genetique getGenetique() {
        return this.genetique;
    }

    public void setGenetique(Genetique genetique) {
        this.genetique = genetique;
    }

    public Animal genetique(Genetique genetique) {
        this.setGenetique(genetique);
        return this;
    }

    public Set<Nutrition> getNutritions() {
        return this.nutritions;
    }

    public void setNutritions(Set<Nutrition> nutritions) {
        if (this.nutritions != null) {
            this.nutritions.forEach(i -> i.setAnimal(null));
        }
        if (nutritions != null) {
            nutritions.forEach(i -> i.setAnimal(this));
        }
        this.nutritions = nutritions;
    }

    public Animal nutritions(Set<Nutrition> nutritions) {
        this.setNutritions(nutritions);
        return this;
    }

    public Animal addNutrition(Nutrition nutrition) {
        this.nutritions.add(nutrition);
        nutrition.setAnimal(this);
        return this;
    }

    public Animal removeNutrition(Nutrition nutrition) {
        this.nutritions.remove(nutrition);
        nutrition.setAnimal(null);
        return this;
    }

    public ConditionsDeVie getConditionsDeVie() {
        return this.conditionsDeVie;
    }

    public void setConditionsDeVie(ConditionsDeVie conditionsDeVie) {
        this.conditionsDeVie = conditionsDeVie;
    }

    public Animal conditionsDeVie(ConditionsDeVie conditionsDeVie) {
        this.setConditionsDeVie(conditionsDeVie);
        return this;
    }

    public Set<Maladie> getMaladies() {
        return this.maladies;
    }

    public void setMaladies(Set<Maladie> maladies) {
        this.maladies = maladies;
    }

    public Animal maladies(Set<Maladie> maladies) {
        this.setMaladies(maladies);
        return this;
    }

    public Animal addMaladie(Maladie maladie) {
        this.maladies.add(maladie);
        maladie.getAnimals().add(this);
        return this;
    }

    public Animal removeMaladie(Maladie maladie) {
        this.maladies.remove(maladie);
        maladie.getAnimals().remove(this);
        return this;
    }

    public Ferme getFerme() {
        return this.ferme;
    }

    public void setFerme(Ferme ferme) {
        this.ferme = ferme;
    }

    public Animal ferme(Ferme ferme) {
        this.setFerme(ferme);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Animal)) {
            return false;
        }
        return id != null && id.equals(((Animal) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Animal{" +
            "id=" + getId() +
            ", ref='" + getRef() + "'" +
            ", age='" + getAge() + "'" +
            ", genre='" + getGenre() + "'" +
            ", poids=" + getPoids() +
            ", refMere='" + getRefMere() + "'" +
            ", refPere='" + getRefPere() + "'" +
            ", type=" + getType() +
            ", race='" + getRace() + "'" +
            "}";
    }
}
