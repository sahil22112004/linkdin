'use client'

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { logoutUser } from '../../redux/slices/authSlics';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import './profileDropDown.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

interface ProfileDropdownProps {
    isOpen: boolean;
    onClose: () => void;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ isOpen, onClose }) => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { currentUser } = useSelector((state: RootState) => state.auth);

    if (!isOpen) return null;

    const handleSignOut = () => {
        dispatch(logoutUser());
        onClose();
        router.push('/auth/login');
    };

    return (
        <>
            <div className="profile-dropdown-overlay" onClick={onClose} aria-hidden="true" />
            <div className="profile-dropdown" onClick={(e) => e.stopPropagation()}>
                <div className="profile-dropdown-header">
                    <div className="profile-info-section">
                        <div className="dropdown-profile-avatar-container">
                            {currentUser?.image ? (
                                <img src={currentUser.image} alt="Profile" className="dropdown-profile-img" />
                            ) : currentUser?.fullname ? (
                                <div className="dropdown-profile-initial">{currentUser.fullname[0]}</div>
                            ) : (
                                <img src="/defaultimg.jpg" alt="Profile" className="dropdown-profile-img" />
                            )}
                        </div>
                        <div className="profile-text-info">
                            <h3 className="dropdown-username">{currentUser?.fullname || 'User'}</h3>
                            <p className="dropdown-headline">{currentUser?.description || 'LinkedIn Member'}</p>
                        </div>
                    </div>
                </div>

                <div className="profile-dropdown-footer">
                    <Link href={`/profile`} className="view-profile-btn" onClick={onClose}>
                        View Profile
                    </Link>
                </div>

                <div className="profile-dropdown-divider" />

                <div className="profile-dropdown-footer">
                    <button className="sign-out-btn" onClick={handleSignOut}>
                        Sign out
                    </button>
                </div>
            </div>
        </>
    );
};

export default ProfileDropdown;


