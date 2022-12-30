import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from '../../context/AuthProvider';

const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signIn, googleLogin } = useContext(AuthContext);
    const [loginError, setLoginError] = useState('');
    const [loginUserEmail, setLoginUserEmail] = useState('')
    // const [token] = useToken(loginUserEmail);
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/'

    // if (token) {
    //     navigate(from, { replace: true });
    // }


    const handleGoogle = () => {
        setLoginError("");
        googleLogin()
            .then((result) => {
                const userInfo = {
                    name: result.user.displayName,
                    email: result.user.email,
                    role: 'buyer'
                }
                fetch('http://localhost:5000/users', {
                    method: "POST",
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(userInfo)
                })
                    .then(res => res.json())
                    .then()
                navigate(from, { replace: true })
            })
            .catch((error) => setLoginError(error.message));
    };


    const handleLogin = (data) => {
        console.log(data);
        setLoginError('');
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setLoginUserEmail(data.email);
            })
            .catch(error => setLoginError(error.message))
    }

    return (
        <div>

            <div className='h-[800px] flex justify-center items-center '>
                <div className='w-96 p-7 shadow-2xl'>
                    <h2 className='text-2xl text-center font-bold'>Login</h2>
                    <form onSubmit={handleSubmit(handleLogin)}>
                        <div className="form-control w-full max-w-xs">
                            <label className="label"><span className="label-text">Email</span> </label>
                            <input className="input input-bordered w-full max-w-xs" type="email"
                                {...register("email", {
                                    required: "Email Address is required"
                                })} />
                            {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label"> <span className="label-text">Password</span> </label>
                            <input className="input input-bordered w-full max-w-xs" type="password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: 'Password must be at last 6 character or longer' }
                                })} />
                            <label className="label"> <span className="label-text">Forget Password?</span> </label>
                            {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                        </div>
                        <input className='btn btn-info w-full' value="Login" type="submit" />
                        <div>
                            {loginError && <p className='text-red-600'> {loginError}</p>}
                        </div>
                    </form>
                    <p className='my-4'>New to JS Media?<Link to='/signup' className='text-accent'> Create new account</Link> </p>
                    <div className="divider">OR</div>
                    <div className='mx-12'>
                        <button onClick={handleGoogle} className="btn btn-accent w-full"><span className='mr-2'><FaGoogle /></span>Google</button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Login;