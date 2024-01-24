package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class NutritionTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Nutrition.class);
        Nutrition nutrition1 = new Nutrition();
        nutrition1.setId(1L);
        Nutrition nutrition2 = new Nutrition();
        nutrition2.setId(nutrition1.getId());
        assertThat(nutrition1).isEqualTo(nutrition2);
        nutrition2.setId(2L);
        assertThat(nutrition1).isNotEqualTo(nutrition2);
        nutrition1.setId(null);
        assertThat(nutrition1).isNotEqualTo(nutrition2);
    }
}
