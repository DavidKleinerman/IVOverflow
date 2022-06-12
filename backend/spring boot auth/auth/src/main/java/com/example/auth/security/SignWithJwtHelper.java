package com.example.auth.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.auth.userAuth.UserAuth;
import com.example.auth.userAuth.UserAuthRepository;
import com.example.auth.userAuth.UserAuthServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.EnvironmentAware;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Component
@PropertySource("classpath:application.properties")
public class SignWithJwtHelper {
    @Autowired
    private Environment env;
    private final UserAuthRepository userAuthRepository;

    @Autowired
    public SignWithJwtHelper(UserAuthRepository userAuthRepository) {
        this.userAuthRepository = userAuthRepository;
    }

    public Map<String, String> signWithJWT(String email){
        Algorithm algorithm = Algorithm.HMAC256(env.getProperty("jwtsecret").getBytes());
        Optional<UserAuth> optionalUser = userAuthRepository.findByEmail(email);
        UserAuth user = optionalUser.get();
        long expiresAt = System.currentTimeMillis() + 60 * 60 * 1000;
        String token = JWT.create().withClaim("email", email).withClaim("nickName", user.getNickName()).withExpiresAt(new Date(expiresAt)).sign(algorithm);
        Map<String, String> tokenMap = new HashMap<>();
        tokenMap.put("token", token);
        tokenMap.put("expiresAt", String.valueOf(expiresAt));
        return tokenMap;
    }


}
