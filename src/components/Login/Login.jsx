import React, { useContext, useState } from 'react';
import './Login.css';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from '../providers/AuthProvider';


const Login = () => {
    const {signIn} = useContext(AuthContext);
    const  navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';
    console.log(from);

    const [error, setError] = useState('');

    const handleLogin = (event)=>{
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        setError('');

        signIn(email, password)
        .then(res=>{
            const loggedUser = res.user;
            console.log(loggedUser);
            form.reset();
            console.log("Navigating to ", from);
            navigate(from, {replace: true});
        })
        .catch(err=>{
            console.log(err.message);
            setError(err.message);
        });
    }
    return (
        <div className='form-container'>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div className="form-control">
                    <label htmlFor="">Email</label>
                    <input type="email" name="email" id="" required />
                </div>
                <div className="form-control">
                    <label htmlFor="">Password</label>
                    <input type="password" name="password" id="" required />
                </div>
                <input className='btn-submit' type="submit" value="Login" />
                <p><small>New here? <Link to='/register'>Sign Up</Link> here</small></p>
            </form>
            {
                error && <p className="text-error">{error}</p>
            }
        </div>
    );
};

export default Login;