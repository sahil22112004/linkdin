'use client'

import { useSelector } from 'react-redux';
import './profile.css';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { IoMdAdd } from "react-icons/io";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { AppDispatch, RootState } from '../../redux/store';
import { useState } from 'react';
import EditProfileModal from '../../components/editprofileModal/editProfileModal';
import ImageUploadModal from '../../components/imageUploadModal/imageUploadModal';
import AddIcon from '@mui/icons-material/Add';
import { ImageType } from '@/app/services/profileApi';



export default function Profile() {
    const user = useSelector((state: RootState) => state.auth.currentUser)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [uploadType, setUploadType] = useState<ImageType>('PROFILE');

    console.log("user is", user)

    const handleOpenImageModal = (type: ImageType) => {
        setUploadType(type);
        setModalTitle(type === 'PROFILE' ? 'Update Profile Photo' : 'Update Background Photo');
        setIsImageModalOpen(true);
    };


    return (
        <div className="profile-container">
            <div className="profile-main">

                <div className="profile-card">
                    <div className="profile-banner" style={{
                        backgroundImage: user?.coverimage ? `url(${user.coverimage})` : 'none',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}>
                        <span className='profile-background-icon' onClick={() => handleOpenImageModal('COVERIMAGE')}><CameraAltIcon /></span>
                    </div>
                    <div className="profile-info">
                        <div>
                            <div className="profile-photo">
                                {user?.image ? (
                                    <img src={user.image} alt={user?.fullname || ''} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                                ) : user?.fullname ? (
                                    user.fullname[0]
                                ) : (
                                    <img src="/defaultimg.jpg" alt="Default Profile" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                                )}
                                <span className='profile-photo-add-icon' onClick={() => handleOpenImageModal('PROFILE')}>
                                    <AddIcon />
                                </span>
                            </div>
                            <h1 className="profile-name">{user?.fullname ? user.fullname : "ENTER YOUR FULL NAME"}</h1>
                            <p className="profile-headline">{user?.description ? user.description : ""}</p>
                            <p className="profile-location"><span>{user?.state ? user.state + " " : ""} </span> <span>{user?.country ? user.country : ""}</span> </p>
                        </div>
                        <span className='edit-profile-icon' onClick={() => setIsEditModalOpen(true)}> <ModeEditOutlineOutlinedIcon /> </span>


                    </div>
                    <div className='profile-card-options'>
                        <span className='option-1' >Open to</span>
                        <span className='option-2' >Add Section</span>
                        <span className='option-2' >Enhanced Profile</span>
                    </div>
                </div>

                <div className="profile-section">

                    <div className='profile-section-header'>
                        <h2 className="section-title">Experience</h2>
                        <div className='edit-profile-section'>
                            <span><IoMdAdd size={25} /></span>
                            <span className='edit-profile-section-icon'> <ModeEditOutlineOutlinedIcon /> </span>
                        </div>
                    </div>
                    <div className="experience-item">
                        <h3 className="item-title">Software Engineer</h3>
                        <p className="item-subtitle">Zenmonk · Full-time</p>
                        <p className="item-date">Jan 2021 - Present</p>
                    </div>
                    <div className="experience-item">
                        <h3 className="item-title">fullstack Developer</h3>
                        <p className="item-subtitle">zemonk · Full-time</p>
                        <p className="item-date">Jun 2018 - Dec 2020</p>
                    </div>
                </div>

                <div className="profile-section">
                    <div className='profile-section-header'>
                        <h2 className="section-title">Education</h2>
                        <div className='edit-profile-section'>
                            <span><IoMdAdd size={25} /></span>
                            <span className='edit-profile-section-icon'> <ModeEditOutlineOutlinedIcon /> </span>
                        </div>
                    </div>
                    <div className="education-item">
                        <h3 className="item-title">chandigarh college of engineering and Technology</h3>
                        <p className="item-subtitle">Bachelor of Science in Computer Science</p>
                        <p className="item-date">2022 - 2026</p>
                    </div>
                </div>

                <div className="profile-section">
                    <h2 className="section-title">Skills</h2>
                    <div className="skills-list">
                        <span className="skill-tag">JavaScript</span>
                        <span className="skill-tag">TypeScript</span>
                        <span className="skill-tag">React.js</span>
                        <span className="skill-tag">Next.js</span>
                        <span className="skill-tag">CSS</span>
                        <span className="skill-tag">HTML</span>
                    </div>
                </div>

            </div>
            <div className="profile-sidebar">
                <div className="sidebar-card">
                    <div className="sidebar-section">
                        <div>
                            <h3 className="sidebar-title">Profile language</h3>
                            <p className="sidebar-subtitle">English</p>
                        </div>
                        <span className='sidebar-section-icon'><ModeEditOutlineOutlinedIcon /></span>
                    </div>
                    <div className="sidebar-section">
                        <div>
                            <h3 className="sidebar-title">Public profile & URL</h3>
                            <p className="sidebar-subtitle">www.linkedin.com/in/sahil-kondal</p>
                        </div>
                        <span className='sidebar-section-icon'><ModeEditOutlineOutlinedIcon /></span>
                    </div>
                </div>
            </div>
            {isEditModalOpen && (
                <EditProfileModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />
            )}
            {isImageModalOpen && (
                <ImageUploadModal
                    isOpen={isImageModalOpen}
                    onClose={() => setIsImageModalOpen(false)}
                    title={modalTitle}
                    type={uploadType}
                />
            )}
        </div>
    );
}

