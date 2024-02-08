import LocalStrateg from 'passport-local';

import {User} from '../models/user.model.js';

const LocalStrategy = LocalStrateg.Strategy;

console.log('Outside initializePassport')
export default function initializePassport(passport) {
    passport.use( 
        new LocalStrategy( {usernameField : 'email' } , async (email, password , done)=>{
            try {
                const user = await User.findOne({email});
                console.log('Inside try');
                console.log(user);
                if(!user){
                    return done(null, false , {message : 'This email is not registered'});
                }
    
                const isPasswordValid = await user.isPasswordCorrect(password);
                if(isPasswordValid){
                    return done(null , user);
                }else{
                    return done(null , false, {message : 'Incorrect Password'});
                }
            } catch (error) {
                console.log('Inside catch');
                console.log(error)
                return done(error , false);
            }
        })
    );
    passport.serializeUser( function(user, done){
        done(null , user.id);
    });

    passport.deserializeUser(function(id , done){
        User.findById(id , function(err, user){
            done(err, user);
        } );
    });

}