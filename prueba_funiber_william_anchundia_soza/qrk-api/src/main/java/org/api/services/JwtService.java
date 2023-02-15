package org.api.services;

import io.smallrye.jwt.build.Jwt;
import javax.inject.Singleton;
import javax.persistence.EntityManager;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@Singleton
public class JwtService {
    private EntityManager em;

    public String generateJwt(){
        Set<String> roles = new HashSet<>(
                Arrays.asList("Admin")
        );

        return Jwt.issuer("prueba-jwt")
                .subject("inventory")
                .groups(roles).expiresAt(System.currentTimeMillis() + 3600).sign();
    }

}
