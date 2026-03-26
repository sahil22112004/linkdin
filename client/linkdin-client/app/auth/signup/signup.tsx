'use client';

import { TextField, Button, Typography, Link } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import './signup.css';
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase/firebase";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineMailOutline } from "react-icons/md";
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { googleLogin, registerUser } from '../../redux/slices/authSlics';
import { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const step1Schema = z.object({
    email: z.string().min(1, 'Email is required'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

const step2Schema = z.object({
    firstName: z.string().min(1, 'First name required'),
    lastName: z.string().min(1, 'Last name required'),
});

type Step1Type = z.infer<typeof step1Schema>;
type Step2Type = z.infer<typeof step2Schema>;

export default function Signup() {

    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch<AppDispatch>();
    const { loading } = useSelector((state: RootState) => state.auth);

    const [step, setStep] = useState(1);
    const [credentials, setCredentials] = useState<{ email: string; password: string } | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    const {
        control: control1,
        handleSubmit: handleSubmit1,
        formState: { errors: errors1 },
    } = useForm<Step1Type>({
        resolver: zodResolver(step1Schema),
        defaultValues: { email: '', password: '' },
    });

    const {
        control: control2,
        handleSubmit: handleSubmit2,
        formState: { errors: errors2 },
    } = useForm<Step2Type>({
        resolver: zodResolver(step2Schema),
        defaultValues: { firstName: '', lastName: '' },
    });

    const handleStep1 = (data: Step1Type) => {
        setCredentials(data);
        setStep(2);
    };

    const handleStep2 = async (data: Step2Type) => {
        if (!credentials) return;

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                credentials.email,
                credentials.password
            );

            const firebaseUser = userCredential.user;
            const token = await firebaseUser.getIdToken();

            const User = {
                fullname: data.firstName + " " + data.lastName,
                email: firebaseUser.email,
                firebase_id: firebaseUser.uid,
                // token: token
            };

            await dispatch(registerUser(User));
            enqueueSnackbar("Registered Successfully!", { variant: "success" });
            router.push('/auth/login');

        } catch (error: any) {
            enqueueSnackbar(error.message, { variant: "error" });
        }
    };

    const googleSign = async () => {
        try {
            const firebaseUser = (await signInWithPopup(auth, googleProvider)).user;
            const token = await firebaseUser.getIdToken();

            const User = {
                fullname: firebaseUser.displayName,
                email: firebaseUser.email,
                firebase_id: firebaseUser.uid,
                token: token
            };
            console.log("info is ",User)

            await dispatch(googleLogin(User));
            router.push('/feed');

        } catch (error: any) {
            enqueueSnackbar(error.message, { variant: "error" });
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

                {step === 1 && (
                    <form className="linkedin-form" onSubmit={handleSubmit1(handleStep1)}>
                        <Controller
                            name="email"
                            control={control1}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    error={!!errors1.email}
                                    helperText={errors1.email?.message}
                                    className="linkedin-input-container"
                                    label="Email"
                                    variant="outlined"
                                />
                            )}
                        />

                        <Controller
                            name="password"
                            control={control1}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    error={!!errors1.password}
                                    helperText={errors1.password?.message}
                                    className="linkedin-input-container"
                                    label="Password"
                                    type={showPassword ? "text" : "password"}
                                    variant="outlined"
                                    InputProps={{
                                        endAdornment: (
                                            <Button onClick={() => setShowPassword(p => !p)}>
                                                {showPassword ? "Hide" : "Show"}
                                            </Button>
                                        )
                                    }}
                                />
                            )}
                        />

                        <Typography className="linkedin-agreement-text">
                            By clicking Agree & Join, you agree to the LinkedIn
                            <Link href="#"> User Agreement </Link>
                            <Link href="#"> Privacy Policy </Link>
                            <Link href="#"> Cookie Policy </Link>
                        </Typography>

                        <Button
                            type="submit"
                            variant="contained"
                            className="linkedin-btn-primary"
                            fullWidth
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={25} color='inherit' /> : "Agree & Join"}
                        </Button>
                    </form>
                )}

                {step === 2 && (
                    <form className="linkedin-form" onSubmit={handleSubmit2(handleStep2)}>
                        <Controller
                            name="firstName"
                            control={control2}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    error={!!errors2.firstName}
                                    helperText={errors2.firstName?.message}
                                    className="linkedin-input-container"
                                    label="First Name"
                                    variant="outlined"
                                />
                            )}
                        />

                        <Controller
                            name="lastName"
                            control={control2}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    error={!!errors2.lastName}
                                    helperText={errors2.lastName?.message}
                                    className="linkedin-input-container"
                                    label="Last Name"
                                    variant="outlined"
                                />
                            )}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            className="linkedin-btn-primary"
                            fullWidth
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={25} color='inherit' /> : "Register"}
                        </Button>
                    </form>
                )}

                {step === 1 && (
                    <>
                        <div className="linkedin-divider-container">
                            <div className="linkedin-divider-line"></div>
                            <span className="linkedin-divider-text">or</span>
                            <div className="linkedin-divider-line"></div>
                        </div>

                        <Button
                            variant="outlined"
                            className="linkedin-btn-secondary"
                            fullWidth
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
                            Join with email
                        </Button>
                    </>
                )}

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