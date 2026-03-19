'use client';

import React, { useEffect, useState } from 'react';
import { TextField, Button, Typography, Link, InputAdornment, IconButton } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth, githubprovider, googleProvider } from '../../firebase/firebase';
import Cookies from 'js-cookie';
import { FcGoogle } from "react-icons/fc";
import { BsApple } from "react-icons/bs";
import './login.css';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchUserProfile, googleLogin, loginUser } from '../../redux/slices/authSlics';
import CircularProgress from '@mui/material/CircularProgress';


export default function Login() {
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch<AppDispatch>();
    const [showPassword, setShowPassword] = useState(false);
    const { loading, isLoggedIn, currentUser, error } = useSelector((state: RootState) => state.auth)

    const singupschema = z.object({
        email: z.string().min(1, 'Email is required').email("Invalid email format."),
        password: z.string().trim().min(4, 'Password must be at least 4 characters'),
    });
    type loginInterface = z.infer<typeof singupschema>

    const { control, handleSubmit, formState: { errors } } = useForm<loginInterface>({
        resolver: zodResolver(singupschema),
        defaultValues: { email: '', password: '' },
    });

    const onSubmit = async (user: loginInterface) => {

        signInWithEmailAndPassword(auth, user.email, user.password)
            .then(async (userCredential) => {
                console.log(userCredential.user)
                const token = await userCredential.user.getIdToken()
                console.log("token is", token)
                const user = {
                    email: userCredential.user.email,
                    token: token
                }
                try {
                    await dispatch(loginUser(user))
                    if (!error ) {
                        router.push('/feed')
                        enqueueSnackbar("Login Success!", { variant: "success" })
                    }else{
                        enqueueSnackbar(error, { variant: "error" })
                    }

                } catch (error: any) {
                    console.log(error)
                    await signOut(auth);
                    enqueueSnackbar(error, { variant: "error" });
                }

            })
            .catch((error: any) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
                enqueueSnackbar(errorMessage, { variant: "error" });
            });

    }

    const googleSign = async () => {
        try {
            const firebaseUser = (await signInWithPopup(auth, googleProvider)).user;
            console.log(firebaseUser)
            const User = {
                fullname: firebaseUser.displayName,
                email: firebaseUser.email,
                firebase_id: firebaseUser.uid,
                token: firebaseUser.getIdToken()
            }
            try {
                await dispatch(googleLogin(User))
                if (!error) {
                    router.push('/feed')
                    enqueueSnackbar("Login Success!", { variant: "success" })
                }else {
                    enqueueSnackbar(error, { variant: "error" })
                }   

            } catch (error: any) {
                enqueueSnackbar(error.message, { autoHideDuration: 3000 });

            }

        } catch (error: any) {
            console.log(error)
        }

    };
    return (
        <div className="linkedin-page-container">
            <header className="linkedin-header">
                <Typography variant="h1" className="linkedin-logo-text">
                    Linked<span className="linkedin-logo-in">in</span>
                </Typography>
            </header>

            <main className="linkedin-card">
                <Typography variant="h2" className="linkedin-heading">
                    Sign in
                </Typography>


                <Button
                    variant="outlined"
                    className="linkedin-btn-secondary"
                    fullWidth
                    disabled={loading}
                    onClick={googleSign}
                >
                    <span style={{ marginRight: '10px' }}>
                        <FcGoogle size={25} />
                    </span>
                    Sign in with Google
                </Button>

                <Button
                    variant="outlined"
                    className="linkedin-btn-secondary"
                    fullWidth
                >
                    <span style={{ marginRight: '10px' }}>
                        <BsApple size={25} />
                    </span>
                    Sign in with Apple
                </Button>

                <Typography variant="body1" className="linkedin-subheading">
                    By clicking Continue, you agree to LinkedIn’s
                    <Link href="#" className="bule-text">
                        User Agreement
                    </Link> ,
                    <Link href="#" className="bule-text">
                        Privacy Policy
                    </Link> , and
                    <Link href="#" className="bule-text">
                        Cookie Policy
                    </Link> .
                </Typography>

                <div className="linkedin-divider-container">
                    <div className="linkedin-divider-line"></div>
                    <span className="linkedin-divider-text">or</span>
                    <div className="linkedin-divider-line"></div>
                </div>

                <form className="linkedin-form" onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                                className="linkedin-input-container"
                                label="Email or Phone"
                                variant="outlined"
                                autoComplete="username"
                            />
                        )}
                    />

                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                                className="linkedin-input-container"
                                label="Password"
                                type={showPassword ? "text" : "password"}
                                variant="outlined"
                                autoComplete="current-password"
                                InputProps={{
                                    endAdornment: (
                                        <Button
                                            onClick={() => setShowPassword(p => !p)}
                                            sx={{ color: 'light blue', fontWeight: 'fontWeightBold' }}
                                        >
                                            {showPassword ? "Hide" : "Show"}
                                        </Button>

                                    )
                                }}


                            />
                        )}
                    />

                    <Link href="" className="linkedin-forgot-password">
                        Forgot password?
                    </Link>


                    <Button
                        type="submit"
                        variant="contained"
                        className="linkedin-btn-primary"
                        disableElevation
                        fullWidth
                        disabled={loading}

                    >
                        {loading ? <CircularProgress size={25} color='inherit' /> : "Sign in"}
                    </Button>
                </form>
            </main>

            <Typography className="linkedin-footer-text">
                New to LinkedIn?{' '}
                <Link href="/auth/signup" className="linkedin-join-link">
                    Join now
                </Link>
            </Typography>
        </div>
    );
}

