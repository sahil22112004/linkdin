'use client'

import React from 'react';
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

export default function MyNetwork() {
    const manageItems = [
        { icon: <PeopleIcon />, label: 'Connections', count: '1,234' },
        { icon: <ContactPhoneIcon />, label: 'Contacts', count: '567' },
        { icon: <PersonAddIcon />, label: 'Following & followers', count: null },
        { icon: <EventIcon />, label: 'Events', count: '2' },
        { icon: <FlagIcon />, label: 'Pages', count: '45' },
        { icon: <ArticleIcon />, label: 'Newsletters', count: '12' },
        { icon: <TagIcon />, label: 'Hashtags', count: '8' },
    ];

    const peopleYouMayKnow = [
        { id: 1, name: 'John Doe', headline: 'Software Engineer at Google', avatar: 'J', mutual: 12 },
        { id: 2, name: 'Jane Smith', headline: 'Product Manager at Meta', avatar: 'J', mutual: 5 },
        { id: 3, name: 'Alice Johnson', headline: 'UX Designer at Amazon', avatar: 'A', mutual: 20 },
        { id: 4, name: 'Bob Wilson', headline: 'Data Scientist at Netflix', avatar: 'B', mutual: 8 },
        { id: 5, name: 'Charlie Brown', headline: 'Frontend Developer', avatar: 'C', mutual: 15 },
        { id: 6, name: 'Diana Prince', headline: 'Marketing Executive', avatar: 'D', mutual: 3 },
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
                    <img src="https://via.placeholder.com/300x250" alt="Ad" />
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
                        <span>Invitations</span>
                        <button className="manage-btn">See all 4</button>
                    </div>
                    <div className="invitation-item">
                        <div className="invitation-left">
                            <div className="invitation-avatar">M</div>
                            <div className="invitation-info">
                                <span className="invitation-name">Michael Scott</span>
                                <span className="invitation-headline">Regional Manager at Dunder Mifflin</span>
                                <span className="invitation-mutual">1 mutual connection</span>
                            </div>
                        </div>
                        <div className="invitation-actions">
                            <button className="ignore-btn">Ignore</button>
                            <button className="accept-btn">Accept</button>
                        </div>
                    </div>
                </div>

                <div className="people-grid-container">
                    <div className="card-header">
                        <span>People you may know from ZenMonk Training</span>
                        <button className="see-all-btn">See all</button>
                    </div>
                    <div className="people-grid">
                        {peopleYouMayKnow.map((person) => (
                            <div key={person.id} className="person-card">
                                <div className="card-banner"></div>
                                <div className="card-close"><CloseIcon fontSize="small" /></div>
                                <div className="card-content">
                                    <div className="person-avatar">{person.avatar}</div>
                                    <h4 className="person-name">{person.name}</h4>
                                    <p className="person-headline">{person.headline}</p>
                                    <p className="person-mutual">{person.mutual} mutual connections</p>
                                    <button className="connect-btn">
                                        <PersonAddIcon fontSize="small" />
                                        Connect
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
