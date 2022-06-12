package com.example.auth.validations;

public class PasswordValidator {
    static public boolean validate(String password) {
        if(password == null){
            return false;
        }
        return password.trim().length() >= 6;
    }
}
