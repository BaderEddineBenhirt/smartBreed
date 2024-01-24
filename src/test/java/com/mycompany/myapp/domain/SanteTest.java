package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class SanteTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Sante.class);
        Sante sante1 = new Sante();
        sante1.setId(1L);
        Sante sante2 = new Sante();
        sante2.setId(sante1.getId());
        assertThat(sante1).isEqualTo(sante2);
        sante2.setId(2L);
        assertThat(sante1).isNotEqualTo(sante2);
        sante1.setId(null);
        assertThat(sante1).isNotEqualTo(sante2);
    }
}
