'use client'

import React, { useEffect, useState } from 'react';
import './myNetwork.css';
import PeopleIcon from '@mui/icons-material/People';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EventIcon from '@mui/icons-material/Event';
import FlagIcon from '@mui/icons-material/Flag';
import ArticleIcon from '@mui/icons-material/Article';
import TagIcon from '@mui/icons-material/Tag';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/redux/store';
import { ConnectionStatus, ConnectUserProfile, fetchAllUserProfile, FollowUserProfile } from '@/app/redux/slices/profileSlice';
import { apiConnectionRequests } from '@/app/services/profileApi';

export default function MyNetwork() {

    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()
    const { loading, allUsers, error } = useSelector((state: RootState) => state.profile)
    const [reqInfo,setReqInfo] = useState([])


    const fetchConnectionReq = async()=>{
        const res = await apiConnectionRequests()
        setReqInfo(res)

    }
    useEffect(() => {
        dispatch(fetchAllUserProfile())
        fetchConnectionReq()
    }, [])
    console.log("allUsers are ", allUsers)

    const handleFollow = async (id: string) => {
        await dispatch(FollowUserProfile(id))
    }
    const handleConnection = async (id: string) => {
        await dispatch(ConnectUserProfile(id))
    }

    const handleConnectionStatus = async (id: string,status:string) => {
        const statusinfo = {
            id:id,
            status:status
        }
        await dispatch(ConnectionStatus(statusinfo))
    }

    const visibleProfiles = allUsers.filter((profile)=>profile.connectionStatus!=='ACCEPTED')

    const manageItems = [
        { icon: <PeopleIcon />, label: 'Connections', count: '1,234' },
        { icon: <ContactPhoneIcon />, label: 'Contacts', count: '567' },
        { icon: <PersonAddIcon />, label: 'Following & followers', count: null },
        { icon: <EventIcon />, label: 'Events', count: '2' },
        { icon: <FlagIcon />, label: 'Pages', count: '45' },
        { icon: <ArticleIcon />, label: 'Newsletters', count: '12' },
        { icon: <TagIcon />, label: 'Hashtags', count: '8' },
    ];

    return (
        <div className="network-container">
            <aside className="network-sidebar">
                <div className="manage-network-card">
                    <h3 className="section-title">Manage my network</h3>
                    <ul className="manage-list">
                        {manageItems.map((item, index) => (
                            <li key={index} className="manage-item">
                                <div className="manage-item-left">
                                    <span className="manage-icon">{item.icon}</span>
                                    <span className="manage-label">{item.label}</span>
                                </div>
                                {item.count && <span className="manage-count">{item.count}</span>}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="sidebar-ad">
                    {/* <img src="https://via.placeholder.com/300x250" alt="Ad" /> */}
                </div>

                <div className="sidebar-footer">
                    <p>About · Accessibility · Help Center</p>
                    <p>Privacy & Terms · Ad Choices · Advertising</p>
                    <p>Business Services · Get the LinkedIn app · More</p>
                    <p className="copyright">LinkedIn Corporation © 2026</p>
                </div>
            </aside>

            <main className="network-main">
                <div className="invitations-card">
                    <div className="card-header">
                        {(reqInfo.length > 0) ?<span>Invitations</span>:<span>No Invitations</span>}
                    </div>
                    {reqInfo.map((req:any)=>(
                        <div key={req.id} className="invitation-item">
                        <div className="invitation-left">
                            <div className="invitation-avatar">
                                    {req.senderId?.image ? (
                                        <img src={req.senderId.image} alt={req.senderId.fullname || ""} className="person-avatar-img" />
                                    ) : req.senderId?.fullname ? (
                                        <span>{req.senderId.fullname.charAt(0).toUpperCase()}</span>
                                    ) : (
                                        <img src="/defaultimg.jpg" alt="Default Avatar" className="person-avatar-img" />
                                    )}
                                </div>
                            <div className="invitation-info">
                                <span className="invitation-name">{req?.senderId?.fullname?req.senderId.fullname:""}</span>
                                <span className="invitation-headline">{req?.senderId?.description?req.senderId.description:""}</span>
                            </div>
                        </div>
                        <div className="invitation-actions">
                            <button className="ignore-btn" onClick={()=>handleConnectionStatus(req.id,'REJECTED')}>Ignore</button>
                            <button className="accept-btn" onClick={()=>handleConnectionStatus(req.id,'ACCEPTED')} >Accept</button>
                        </div>
                    </div>
                        
                    ))}
                    
                </div>

                <div className="people-grid-container">
                    <div className="card-header">
                        <span>People you may know </span>
                        <button className="see-all-btn">See all</button>
                    </div>
                    <div className="people-grid">
                        {visibleProfiles.map((profile) => (
                            <div key={profile.id} className="person-card">
                                <div
                                    className="card-banner"
                                    style={profile.coverimage ? { backgroundImage: `url(${profile.coverimage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
                                ></div>
                                <div className="card-close"><CloseIcon fontSize="small" /></div>
                                <div className="card-content">
                                    <div className="person-avatar">
                                        {profile.image ? (
                                            <img src={profile.image} alt={profile.fullname || ""} className="person-avatar-img" />
                                        ) : profile.fullname ? (
                                            <span>{profile.fullname.charAt(0).toUpperCase()}</span>
                                        ) : (
                                            <img src="/defaultimg.jpg" alt="Default Avatar" className="person-avatar-img" />
                                        )}
                                    </div>
                                    <h4 className="person-name">{profile.fullname}</h4>
                                    <p className="person-headline">{profile.description}</p>
                                    <p className="person-mutual">{profile.followerCount} followers</p>
                                    <button
                                        className="follow-btn"
                                        onClick={() => handleFollow(profile.id)}
                                    >
                                        {profile.isFollowing ? "UnFollow" : "Follow"}
                                    </button>
                                    {(
                                        profile.connectionStatus == 'NOT_EXISTED' ||
                                        profile.connectionStatus == 'REJECTED' ||
                                        profile.connectionStatus == 'PENDING') ? 
                                        <button 
                                        className="connect-btn"
                                        onClick={()=>handleConnection(profile.id)}
                                        >

                                        {(profile.connectionStatus == 'NOT_EXISTED' ||
                                            profile.connectionStatus == 'REJECTED') ?
                                            <>
                                                <PersonAddIcon fontSize="small" />
                                                Connect
                                            </> :
                                            <span>Pending</span>
                                        }
                                    </button> :
                                    <>
                                    <span>Sent you a Connection Req</span>
                                        <div className='selection-btn-grp'>
                                            <button className='select-connect-btn'>Ignore</button>
                                            <button className='select-connect-btn'>Accept</button>

                                        </div>
                                    </>

                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}


// in my network do that when

