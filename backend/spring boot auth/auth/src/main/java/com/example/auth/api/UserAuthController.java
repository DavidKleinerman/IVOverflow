package com.example.auth.api;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.auth.security.SignWithJwtHelper;
import com.example.auth.userAuth.UserAuth;
import com.example.auth.userAuth.UserAuthServiceImpl;
import com.example.auth.validations.EmailValidator;
import com.example.auth.validations.NameValidator;
import com.example.auth.validations.PasswordValidator;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.naming.AuthenticationNotSupportedException;
import javax.xml.bind.ValidationException;
import java.net.URI;
import java.util.HashMap;
import java.util.Map;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping("/api")
@PropertySource("classpath:application.properties")
public class UserAuthController {
    @Autowired
    private Environment env;
    private final UserAuthServiceImpl userAuthServiceImpl;

    private final SignWithJwtHelper jwtHelper;

    @Autowired
    public UserAuthController(UserAuthServiceImpl userAuthServiceImpl, SignWithJwtHelper jwtHelper) {
        this.userAuthServiceImpl = userAuthServiceImpl;
        this.jwtHelper = jwtHelper;
    }

    @PostMapping("/signup")
    public ResponseEntity saveUser(@RequestBody UserAuth user){
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/signup").toUriString());
        boolean emailValid, passwordValid, nickNameValid, fullNameValid;
        emailValid = EmailValidator.validate(user.getEmail());
        passwordValid = PasswordValidator.validate(user.getPassword());
        nickNameValid = NameValidator.validate(user.getNickName());
        fullNameValid = NameValidator.validate(user.getFullName());
        if (!emailValid || !passwordValid || !nickNameValid || !fullNameValid){
            throw new AuthenticationServiceException("malformed credentials");
        }
        userAuthServiceImpl.saveUser(user);
        Map<String, String> tokenMap = jwtHelper.signWithJWT(user.getEmail());
        return new ResponseEntity(HttpStatus.CREATED).created(uri).body(tokenMap);
    }

    @GetMapping("/userinfo")
    public ResponseEntity getInfoFromJWT(@RequestHeader String Authorization){
        if(Authorization != null && Authorization.startsWith("Bearer ")){
            try {
                URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/userinfo").toUriString());
                String token = Authorization.substring("Bearer ".length());
                Algorithm algorithm = Algorithm.HMAC256(env.getProperty("jwtsecret").getBytes());
                JWTVerifier verifier = JWT.require(algorithm).build();
                DecodedJWT decodedJWT = verifier.verify(token);
                String email = decodedJWT.getClaim("email").asString();
                String nickName = decodedJWT.getClaim("nickName").asString();
                Map<String, String> body = new HashMap<>();
                body.put("email", email);
                body.put("nickName", nickName);
                return new ResponseEntity(HttpStatus.ACCEPTED).created(uri).body(body);
            } catch (Exception exception) {
                throw new AuthenticationServiceException("bad token");
            }
        } else {
            throw new AuthenticationCredentialsNotFoundException("missing or malformed token header");
        }
    }
}
