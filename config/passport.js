import LocalStrategy from 'passport-local';

import {User} from '../models/user.model.js';

export default function initializePassport(passport) {
    passport.use( 
        new LocalStrategy( {usernameField : 'email' } , async (email, password , done)=>{
            try {
                const user = await User.findOne({email});
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
                return done(error , false);
            }
        })
    );
    passport.serializeUser( function(user, done){
        done(null , user.id);
    });

    passport.deserializeUser(async function(id, done) {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });

}