'use client'

import Link from 'next/link';
import './navbar.css';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import TextsmsIcon from '@mui/icons-material/Textsms';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AppsIcon from '@mui/icons-material/Apps';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { IoHomeSharp } from "react-icons/io5";
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-left">
                    <Link href="/">
                        <span className="linkedin-logo-in">in</span>
                    </Link>
                    <div className="navbar-search">
                        <SearchIcon className="search-icon" />
                        <input type="text" placeholder="Search" />
                    </div>
                </div>

                <div className="navbar-right">
                    <Link href="/feed" className={`nav-item ${isActive('/feed') ? 'active' : ''}`}>
                        <IoHomeSharp className="nav-icon" />
                        <span className="nav-text">Home</span>
                    </Link>
                    <Link href="/myNetwork" className={`nav-item ${isActive('/myNetwork') ? 'active' : ''}`}>
                        <SupervisorAccountIcon className="nav-icon" />
                        <span className="nav-text">My Network</span>
                    </Link>
                    <Link href="/jobs" className={`nav-item ${isActive('/jobs') ? 'active' : ''}`}>
                        <BusinessCenterIcon className="nav-icon" />
                        <span className="nav-text">Jobs</span>
                    </Link>
                    <Link href="/messages" className={`nav-item ${isActive('/messages') ? 'active' : ''}`}>
                        <TextsmsIcon className="nav-icon" />
                        <span className="nav-text">Messaging</span>
                    </Link>
                    <Link href="/notifications" className={`nav-item ${isActive('/notifications') ? 'active' : ''}`}>
                        <NotificationsIcon className="nav-icon" />
                        <span className="nav-text">Notifications</span>
                    </Link>

                    <div className="nav-item me-item">
                        <AccountCircleIcon className="nav-icon profile-icon" />
                        <span className="nav-text">
                            Me <ArrowDropDownIcon fontSize="small" className="dropdown-icon" />
                        </span>
                    </div>

                    <div className="navbar-divider"></div>

                    <div className="nav-item">
                        <AppsIcon className="nav-icon" />
                        <span className="nav-text">
                            For Business <ArrowDropDownIcon fontSize="small" className="dropdown-icon" />
                        </span>
                    </div>

                    <div className="nav-item premium-link">
                        <p className='nav-text'> Try Premium Free</p>
                    </div>
                </div>
            </div>
        </nav>
    );
}


