package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ConditionsDeVieTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ConditionsDeVie.class);
        ConditionsDeVie conditionsDeVie1 = new ConditionsDeVie();
        conditionsDeVie1.setId(1L);
        ConditionsDeVie conditionsDeVie2 = new ConditionsDeVie();
        conditionsDeVie2.setId(conditionsDeVie1.getId());
        assertThat(conditionsDeVie1).isEqualTo(conditionsDeVie2);
        conditionsDeVie2.setId(2L);
        assertThat(conditionsDeVie1).isNotEqualTo(conditionsDeVie2);
        conditionsDeVie1.setId(null);
        assertThat(conditionsDeVie1).isNotEqualTo(conditionsDeVie2);
    }
}
