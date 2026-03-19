'use client';

import { TextField, Button, Typography, Link } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import './signup.css';
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth, githubprovider, googleProvider } from "../../firebase/firebase";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineMailOutline } from "react-icons/md";
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { googleLogin, registerUser } from '../../redux/slices/authSlics';
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';



const signupSchema = z.object({
    email: z.string().min(1, 'Email or phone number is required'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

type SignupSchema = z.infer<typeof signupSchema>;

export default function Signup() {



    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch<AppDispatch>();
    const [showPassword, setShowPassword] = useState(false);
    const { loading, isLoggedIn, currentUser, error } = useSelector((state: RootState) => state.auth)

    // useEffect(() => {
    //     if (currentUser && !error && isLoggedIn) {

    //         router.push('/feed')
    //         enqueueSnackbar("Login Success!", { variant: "success" })
    //     }

    //     if (error) {
    //         enqueueSnackbar(error, { variant: "error" })
    //     }
    // }, [currentUser, error])


    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupSchema>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (user: SignupSchema) => {
        console.log('working')
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                user.email,
                user.password
            );
            const firebaseUser = userCredential.user;
            console.log(firebaseUser)
            const token = await firebaseUser.getIdToken()
            console.log("token is ", token)
            const User = {
                fullname: firebaseUser.displayName,
                email: firebaseUser.email,
                firebase_id: firebaseUser.uid

            }
            try {
                await dispatch(registerUser(User))
                enqueueSnackbar("Registered Successfully!", { autoHideDuration: 3000 });
                router.push('/auth/login')

            } catch (error: any) {
                enqueueSnackbar(error.message, { autoHideDuration: 3000 });

            }
            console.log(firebaseUser)

        } catch (error: any) {
            console.error(error);
        }
    };

    const googleSign = async () => {
        try {
            const firebaseUser = (await signInWithPopup(auth, googleProvider)).user;
            console.log(firebaseUser)
            const token = await firebaseUser.getIdToken()
            const User = {
                fullname: firebaseUser.displayName,
                email: firebaseUser.email,
                firebase_id: firebaseUser.uid,
                token: token
            }
            console.log("user data is", User)
            try {
                await dispatch(googleLogin(User))
                if (currentUser && !error && isLoggedIn) {

                    router.push('/feed')
                    enqueueSnackbar("Login Success!", { variant: "success" })
                }

                if (error) {
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
            <Typography variant="h1" className="linkedin-logo-text">
                Linked<span className="linkedin-logo-in">in</span>
            </Typography>


            <Typography variant="h2" className="linkedin-main-heading">
                Make the most of your professional life
            </Typography>

            <main className="linkedin-card">
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
                                label="Email or phone number"
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
                                autoComplete="new-password"
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

                    <Typography className="linkedin-agreement-text">
                        By clicking Agree & Join, you agree to the LinkedIn
                        <Link href="#">User Agreement</Link>,
                        <Link href="#">Privacy Policy</Link>, and
                        <Link href="#">Cookie Policy</Link>.
                    </Typography>

                    <Button
                        type="submit"
                        variant="contained"
                        className="linkedin-btn-primary"
                        disableElevation
                        fullWidth
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={25} color='inherit' /> : "Agree & Join"}
                    </Button>
                </form>

                <div className="linkedin-divider-container">
                    <div className="linkedin-divider-line"></div>
                    <span className="linkedin-divider-text">or</span>
                    <div className="linkedin-divider-line"></div>
                </div>

                <Button
                    variant="outlined"
                    className="linkedin-btn-secondary"
                    fullWidth
                    disabled={loading}
                    onClick={googleSign}
                    sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}
                >
                    <span style={{ marginRight: '10px' }}>
                        <FcGoogle size={25} />
                    </span>
                    Continue with Google
                </Button>

                <Button
                    variant="outlined"
                    className="linkedin-btn-secondary"
                    fullWidth
                    sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}
                >
                    <span style={{ marginRight: '10px' }}>
                        <MdOutlineMailOutline size={25} />
                    </span>
                    join with email
                </Button>

                <Typography className="linkedin-footer-text">
                    Already on LinkedIn?{' '}
                    <Link href="/auth/login" className="linkedin-join-link">
                        Sign in
                    </Link>
                </Typography>
            </main>
        </div>
    );
}
