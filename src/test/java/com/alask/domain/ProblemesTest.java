package com.alask.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.alask.web.rest.TestUtil;

public class ProblemesTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Problemes.class);
        Problemes problemes1 = new Problemes();
        problemes1.setId(1L);
        Problemes problemes2 = new Problemes();
        problemes2.setId(problemes1.getId());
        assertThat(problemes1).isEqualTo(problemes2);
        problemes2.setId(2L);
        assertThat(problemes1).isNotEqualTo(problemes2);
        problemes1.setId(null);
        assertThat(problemes1).isNotEqualTo(problemes2);
    }
}
