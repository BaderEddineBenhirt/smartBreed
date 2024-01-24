package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class GenetiqueTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Genetique.class);
        Genetique genetique1 = new Genetique();
        genetique1.setId(1L);
        Genetique genetique2 = new Genetique();
        genetique2.setId(genetique1.getId());
        assertThat(genetique1).isEqualTo(genetique2);
        genetique2.setId(2L);
        assertThat(genetique1).isNotEqualTo(genetique2);
        genetique1.setId(null);
        assertThat(genetique1).isNotEqualTo(genetique2);
    }
}
