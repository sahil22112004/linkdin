'use client'

import { useSelector } from 'react-redux';
import './profile.css';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { IoMdAdd } from "react-icons/io";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { RootState } from '../../redux/store';
import { useState } from 'react';
import EditProfileModal from '../../components/editprofileModal/editProfileModal';
import ImageUploadModal from '../../components/imageUploadModal/imageUploadModal';
import AddIcon from '@mui/icons-material/Add';
import { ImageType } from '@/app/services/profileApi';
import ExperienceModal from '../../components/experienceModal/ExperienceModal';
import EducationModal from '../../components/educationModal/EducationModal';

export default function Profile() {
    const user = useSelector((state: RootState) => state.auth.currentUser)

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);
    const [isEducationModalOpen, setIsEducationModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [uploadType, setUploadType] = useState<ImageType>('PROFILE');

    const handleOpenImageModal = (type: ImageType) => {
        setUploadType(type);
        setModalTitle(type === 'PROFILE' ? 'Update Profile Photo' : 'Update Background Photo');
        setIsImageModalOpen(true);
    };

    return (
        <div className="profile-container">
            <div className="profile-main">

                <div className="profile-card">
                    <div
                        className="profile-banner"
                        style={{
                            backgroundImage: user?.coverimage ? `url(${user.coverimage})` : 'none',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    >
                        <span
                            className='profile-background-icon'
                            onClick={() => handleOpenImageModal('COVERIMAGE')}
                        >
                            <CameraAltIcon />
                        </span>
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

                            <h1 className="profile-name">
                                {user?.fullname || "ENTER YOUR FULL NAME"}
                            </h1>

                            <p className="profile-headline">
                                {user?.description || ""}
                            </p>

                            <p className="profile-location">
                                {user?.state ? `${user.state}, ` : ""}
                                {user?.country || ""}
                            </p>
                        </div>

                        <span
                            className='edit-profile-icon'
                            onClick={() => setIsEditModalOpen(true)}
                        >
                            <ModeEditOutlineOutlinedIcon />
                        </span>
                    </div>

                    <div className='profile-card-options'>
                        <span className='option-1'>Open to</span>
                        <span className='option-2'>Add Section</span>
                        <span className='option-2'>Enhanced Profile</span>
                    </div>
                </div>

                <div className="profile-section">
                    <div className='profile-section-header'>
                        <h2 className="section-title">Experience</h2>
                        <div className='edit-profile-section'>
                            <span onClick={() => setIsExperienceModalOpen(true)}>
                                <IoMdAdd size={25} />
                            </span>
                            <span className='edit-profile-section-icon'>
                                <ModeEditOutlineOutlinedIcon />
                            </span>
                        </div>
                    </div>

                    {user?.experence?.length ? (
                        user.experence.map((exp: any, index: number) => (
                            <div className="experience-item" key={exp.id || index}>
                                <h3 className="item-title">{exp.title}</h3>
                                <p className="item-subtitle">
                                    {exp.company} · {exp.employmentType}
                                </p>
                                <p className="item-date">
                                    {exp.startTime} - {exp.endTime}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p>add experience</p>
                    )}
                </div>

                <div className="profile-section">
                    <div className='profile-section-header'>
                        <h2 className="section-title">Education</h2>
                        <div className='edit-profile-section'>
                            <span onClick={() => setIsEducationModalOpen(true)}>
                                <IoMdAdd size={25} />
                            </span>
                            <span className='edit-profile-section-icon'>
                                <ModeEditOutlineOutlinedIcon />
                            </span>
                        </div>
                    </div>

                    {/* {user?.education?.length ? (
                        user.education.map((edu: any, index: number) => (
                            <div className="education-item" key={edu.id || index}>
                                <h3 className="item-title">{edu.school}</h3>
                                <p className="item-subtitle">
                                    {edu.degree} · {edu.fieldOfStudy}
                                </p>
                                <p className="item-date">
                                    {edu.startTime} - {edu.endTime}
                                </p>
                            </div>
                        )) */}
                    {/* // ) : ( */}
                        <p>add education</p>
                    {/* // )} */}
                </div>

                {/* SKILLS */}
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

            {/* SIDEBAR */}
            <div className="profile-sidebar">
                <div className="sidebar-card">
                    <div className="sidebar-section">
                        <div>
                            <h3 className="sidebar-title">Profile language</h3>
                            <p className="sidebar-subtitle">English</p>
                        </div>
                        <span className='sidebar-section-icon'>
                            <ModeEditOutlineOutlinedIcon />
                        </span>
                    </div>

                    <div className="sidebar-section">
                        <div>
                            <h3 className="sidebar-title">Public profile & URL</h3>
                            <p className="sidebar-subtitle">
                                www.linkedin.com/in/sahil-kondal
                            </p>
                        </div>
                        <span className='sidebar-section-icon'>
                            <ModeEditOutlineOutlinedIcon />
                        </span>
                    </div>
                </div>
            </div>

            {/* MODALS */}
            {isEditModalOpen && (
                <EditProfileModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                />
            )}

            {isImageModalOpen && (
                <ImageUploadModal
                    isOpen={isImageModalOpen}
                    onClose={() => setIsImageModalOpen(false)}
                    title={modalTitle}
                    type={uploadType}
                />
            )}

            {isExperienceModalOpen && (
                <ExperienceModal
                    isOpen={isExperienceModalOpen}
                    onClose={() => setIsExperienceModalOpen(false)}
                />
            )}

            {isEducationModalOpen && (
                <EducationModal
                    isOpen={isEducationModalOpen}
                    onClose={() => setIsEducationModalOpen(false)}
                />
            )}
        </div>
    );
}