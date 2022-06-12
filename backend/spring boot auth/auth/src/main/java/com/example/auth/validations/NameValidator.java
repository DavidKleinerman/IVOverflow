package com.example.auth.validations;

public class NameValidator {
    static public boolean validate(String name) {
        if(name == null){
            return false;
        }
        return !name.trim().equals("");
    }
}
