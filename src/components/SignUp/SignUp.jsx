import React, { useContext, useState } from "react";
import "./SignUp.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const SignUp = () => {

   const [error, setError] = useState('');
   const {createUser} = useContext(AuthContext);

   const handleSignUp = (event)=>{
      event.preventDefault();

      const form = event.target;
      const email = form.email.value;
      const password = form.password.value;
      const c_password = form.c_password.value;
      console.log(email, password, c_password);

      setError('');
      if(password !== c_password){
         setError('Password and Confirm password didn\'t match');
         return
      }else if(password.length <6){
         setError('Password length must be greater than 6');
         return
      }

      createUser(email, password)
      .then(res=>{
         const loggedUser = res.user;
         console.log(loggedUser);
      })
      .catch(err=>{
         err.message;
      });
   }

   return (
      <div className="form-container">
         <h2>Sign Up</h2>
         <form onSubmit={handleSignUp}>
            <div className="form-control">
               <label htmlFor="">Email</label>
               <input type="email" name="email" id="email" required />
            </div>
            <div className="form-control">
               <label htmlFor="">Password</label>
               <input type="password" name="password" id="password" required />
            </div>
            <div className="form-control">
               <label htmlFor="">Confirm</label>
               <input type="password" name="c_password" id="c_password" required />
            </div>
            <input className="btn-submit" type="submit" value="Sign Up" />
            <p><small>Already have an account? <Link to='/login'>Login</Link> here</small></p>
         </form>
         {
            error && <p className="text-error">{error}</p>
         }
      </div>
   );
};

export default SignUp;
