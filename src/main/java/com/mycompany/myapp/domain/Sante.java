package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;

/**
 * A Sante.
 */
@Entity
@Table(name = "sante")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Sante implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "traitements_preventifs")
    private String traitementsPreventifs;

    @Column(name = "soins")
    private String soins;

    @Column(name = "vaccins")
    private String vaccins;

    @ManyToOne
    @JsonIgnoreProperties(value = { "santes", "animals" }, allowSetters = true)
    private Maladie maladie;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Sante id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTraitementsPreventifs() {
        return this.traitementsPreventifs;
    }

    public Sante traitementsPreventifs(String traitementsPreventifs) {
        this.setTraitementsPreventifs(traitementsPreventifs);
        return this;
    }

    public void setTraitementsPreventifs(String traitementsPreventifs) {
        this.traitementsPreventifs = traitementsPreventifs;
    }

    public String getSoins() {
        return this.soins;
    }

    public Sante soins(String soins) {
        this.setSoins(soins);
        return this;
    }

    public void setSoins(String soins) {
        this.soins = soins;
    }

    public String getVaccins() {
        return this.vaccins;
    }

    public Sante vaccins(String vaccins) {
        this.setVaccins(vaccins);
        return this;
    }

    public void setVaccins(String vaccins) {
        this.vaccins = vaccins;
    }

    public Maladie getMaladie() {
        return this.maladie;
    }

    public void setMaladie(Maladie maladie) {
        this.maladie = maladie;
    }

    public Sante maladie(Maladie maladie) {
        this.setMaladie(maladie);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Sante)) {
            return false;
        }
        return id != null && id.equals(((Sante) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Sante{" +
            "id=" + getId() +
            ", traitementsPreventifs='" + getTraitementsPreventifs() + "'" +
            ", soins='" + getSoins() + "'" +
            ", vaccins='" + getVaccins() + "'" +
            "}";
    }
}
