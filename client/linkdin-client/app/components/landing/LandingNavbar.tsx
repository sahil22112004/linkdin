import Link from 'next/link';
import './LandingNavbar.css';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import PeopleIcon from '@mui/icons-material/People';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ExtensionIcon from '@mui/icons-material/Extension';

export default function LandingNavbar() {
    return (
        <nav className="landing-navbar">
            <div className="landing-navbar-container">
                <div className="landing-navbar-left">
                    <Link href="/" className="landing-logo">
                        <span className="landing-linkedin-text">Linked</span>
                        <span className="landing-linkedin-box">in</span>
                    </Link>
                </div>

                <div className="landing-navbar-right">
                    <div className="landing-nav-links">
                        <Link href="#" className="landing-nav-item">
                            <RocketLaunchIcon className="landing-nav-icon" />
                            <span>Top Content</span>
                        </Link>
                        <Link href="#" className="landing-nav-item">
                            <PeopleIcon className="landing-nav-icon" />
                            <span>People</span>
                        </Link>
                        <Link href="#" className="landing-nav-item">
                            <MenuBookIcon className="landing-nav-icon" />
                            <span>Learning</span>
                        </Link>
                        <Link href="#" className="landing-nav-item">
                            <BusinessCenterIcon className="landing-nav-icon" />
                            <span>Jobs</span>
                        </Link>
                        <Link href="#" className="landing-nav-item">
                            <ExtensionIcon className="landing-nav-icon" />
                            <span>Games</span>
                        </Link>
                    </div>

                    <div className="landing-navbar-divider"></div>

                    <div className="landing-auth-buttons">
                        <Link href="/auth/login" className="btn-signin-transparent">Sign in</Link>
                        <Link href="/auth/signup" className="btn-join-primary">Join now</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
