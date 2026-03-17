'use client'

import Link from 'next/link';
import './Hero.css';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { AppDispatch, RootState } from '@/app/redux/store';
import { useEffect } from 'react';
import { googleLogin } from '@/app/redux/slices/authSlics';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '@/app/firebase/firebase';
import { FcGoogle } from "react-icons/fc";


export default function Hero() {

    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch<AppDispatch>();
    const { loading, isLoggedIn, currentUser, error } = useSelector((state: RootState) => state.auth)

    useEffect(() => {
        if (currentUser && !error && isLoggedIn) {

            router.push('/feed')
            enqueueSnackbar("Login Success!", { variant: "success" })
        }

        if (error) {
            enqueueSnackbar(error, { variant: "error" })
        }
    }, [currentUser, error])

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
                enqueueSnackbar("login Successfully!", { autoHideDuration: 3000 });
                // router.push('/auth/login')

            } catch (error: any) {
                enqueueSnackbar(error.message, { autoHideDuration: 3000 });

            }

        } catch (error: any) {
            console.log(error)
        }

    };

    return (
        <section className="hero">
            <div className="hero-container">
                <div className="hero-left">
                    <h1 className="hero-heading">Welcome to your professional network</h1>

                    <div className="hero-auth-stack">
                        <button className="btn-google" onClick={googleSign}>
                            <span style={{ marginRight: '10px' }}>
                                <FcGoogle size={25} />
                            </span>
                            Continue with Google
                        </button>

                        <button className="btn-email" onClick={() => router.push('/auth/login')} >
                            Sign in with email
                        </button>

                        <p className="auth-agreement">
                            By clicking Continue to join or sign in, you agree to LinkedIn’s
                            <Link href="#"> User Agreement</Link>,
                            <Link href="#"> Privacy Policy</Link>, and
                            <Link href="#"> Cookie Policy</Link>.
                        </p>

                        <p className="auth-join-prompt">
                            New to LinkedIn? <Link href="/auth/signup">Join now</Link>
                        </p>
                    </div>
                </div>

                <div className="hero-right">
                    <div className="hero-image-container">
                        <img
                            src="/linkedin_festive_hero.png"
                            alt="Professional community"
                            className="hero-main-img"
                        />
                        <div className="hero-image-overlay">
                            <span>find your</span>
                            <span className="linkedin-logo-overlay">in</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
