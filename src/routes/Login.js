import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { withRouter } from "react-router-dom";

//style
import '../stylesheets/Login.scss';

//axios and local storage
import axios from '../utils/axios';
import localStorage from '../utils/localStorage';
import Header from '../components/Header';

const Login = (props) => {

    //creates react-hook-form and components
    const { handleSubmit, register, errors } = useForm();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");



    //handling inputs
    const handleEmail=(e)=>{
        setEmail(e.target.value);
    };
    const handlePassword=(e)=>{
        setPassword(e.target.value);
    };
    //end of handling inputs

    //submitting the form
    const formSubmit=(e)=>{
        let data = {
            email,
            password
        };

        axios.post('/auth',data)
        .then(res=>{
            localStorage.setJWT(res.data.authToken);
            props.history.push('/Admin');
            //go to admin control panel
            console.log({props});
            console.log('Logged in!');
        })
        .catch(()=>{
            console.log('Error logging in!');
        });
    };
    // resetting data
    const resetForm = () => {
        setEmail("");
        setPassword("");
    };

    return(
        <>
            <Header
                title="Login"
                description="Please enter your e-mail and password:"
                headerClass="Login"
                hClass="Login-H"
                subHClass="Login-SH"
            />
            <div className="loginInfo">
                <form className="loginForm" onSubmit={handleSubmit(formSubmit)}>
                    <div className="loginItem">
                        <label htmlFor="email">Email</label><br/>
                        <input type="email"
                        name="email"
                        placeholder="Your Email"
                        value={email}
                        onChange={handleEmail}
                        ref={register({ required: true })}
                        />
                    </div>
                    {errors.email && (<p>EMAIL IS REQUIRED!</p>)}

                    <div className="loginItem">
                        <label htmlFor="password">Password</label><br/>
                        <input type="password" 
                        name="password" 
                        placeholder="Your Password"
                        value={password}
                        onChange={handlePassword}
                        ref={register({ required: true })}
                        />
                    </div>
                    {errors.password && (<p>PASSWORD IS REQUIRED!</p>)}

                    <button type="submit">Login</button>
                </form>
            </div>
        </>
    );
};

Login.defaultProps = {
    history:{
        push: () => {}
    }
}

export default withRouter(Login);