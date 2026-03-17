
'use client'

import React, { useState } from 'react';
import './message.css';
import SearchIcon from '@mui/icons-material/Search';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ImageIcon from '@mui/icons-material/Image';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import GifIcon from '@mui/icons-material/Gif';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SendIcon from '@mui/icons-material/Send';

import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';

const MOCK_CONVERSATIONS = [
    {
        id: 1,
        name: 'Sahil Kondal',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
        lastMessage: 'Sure, I will send the files by evening.',
        time: 'Mar 15',
        status: 'Online',
        messages: [
            { id: 1, sender: 'Sahil Kondal', text: 'Hello! How are you?', time: '2:30 PM', isMe: false, avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80' },
            { id: 2, sender: 'Me', text: 'I am good, thanks! Did you check the project requirements?', time: '2:35 PM', isMe: true, avatar: null },
            { id: 3, sender: 'Sahil Kondal', text: 'Yes, looking good. Sure, I will send the files by evening.', time: '2:40 PM', isMe: false, avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80' },
        ]
    },
    {
        id: 2,
        name: 'James Wilson',
        avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
        lastMessage: 'The interview is scheduled for tomorrow.',
        time: 'Mar 14',
        status: 'Offline',
        messages: [
            { id: 1, sender: 'James Wilson', text: 'Hi, are you available for a quick call?', time: '10:00 AM', isMe: false, avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80' },
            { id: 2, sender: 'Me', text: 'Hi James, yes, let me know the time.', time: '10:15 AM', isMe: true, avatar: null },
            { id: 3, sender: 'James Wilson', text: 'The interview is scheduled for tomorrow.', time: '11:00 AM', isMe: false, avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80' },
        ]
    },
    {
        id: 3,
        name: 'Emily Davis',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
        lastMessage: 'Great work on the latest update!',
        time: 'Mar 12',
        status: 'Away',
        messages: []
    }
];

export default function MessagingPage() {
    const [activeConvId, setActiveConvId] = useState(1);
    const [messageInput, setMessageInput] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const activeConv = MOCK_CONVERSATIONS.find(c => c.id === activeConvId) || MOCK_CONVERSATIONS[0];

    const handleSendMessage = () => {
        if (!messageInput.trim()) return;
        console.log('Sending message:', messageInput);
        setMessageInput('');
        setShowEmojiPicker(false);
    };

    const onEmojiClick = (emojiData: EmojiClickData) => {
        setMessageInput(prev => prev + emojiData.emoji);
    };

    return (
        <div className="messaging-container">

            <div className="messages-sidebar">
                <div className="sidebar-header">
                    <h2>Messaging</h2>
                    <div className="sidebar-icons">
                        <MoreHorizIcon className="icon" />
                        <EditNoteIcon className="icon" />
                    </div>
                </div>
                <div className="sidebar-search">
                    <SearchIcon className="search-icon" />
                    <input type="text" placeholder="Search messages" />
                </div>
                <div className="conversation-list">
                    {MOCK_CONVERSATIONS.map(conv => (
                        <div
                            key={conv.id}
                            className={`conversation-item ${activeConvId === conv.id ? 'active' : ''}`}
                            onClick={() => setActiveConvId(conv.id)}
                        >
                            <img src={conv.avatar} alt={conv.name} className="avatar" />
                            <div className="conversation-info">
                                <div className="conversation-info-header">
                                    <span className="conversation-name">{conv.name}</span>
                                    <span className="conversation-time">{conv.time}</span>
                                </div>
                                <div className="last-message">{conv.lastMessage}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="chat-window">
                <div className="chat-header">
                    <div className="chat-header-info">
                        <h3>{activeConv.name}</h3>
                        <p>{activeConv.status}</p>
                    </div>
                    <div className="chat-actions">
                        <MoreHorizIcon className="icon" />
                    </div>
                </div>

                <div className="message-thread">
                    {activeConv.messages.length > 0 ? (
                        activeConv.messages.map(msg => (
                            <div key={msg.id} className="message">
                                {msg.avatar ? (
                                    <img src={msg.avatar} alt={msg.sender} className="message-avatar" />
                                ) : (
                                    <div className="message-avatar" style={{ backgroundColor: '#0a66c2', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: '600' }}>
                                        M
                                    </div>
                                )}
                                <div className="message-content">
                                    <div className="message-meta">
                                        <span className="message-sender">{msg.sender}</span>
                                        <span className="message-time">{msg.time}</span>
                                    </div>
                                    <div className="message-text">{msg.text}</div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="empty-thread" style={{ textAlign: 'center', marginTop: '100px', color: 'rgba(0,0,0,0.6)' }}>
                            <p>No messages yet. Say hello!</p>
                        </div>
                    )}
                </div>

                <div className="chat-input-container">
                    {showEmojiPicker && (
                        <div style={{ position: 'absolute', bottom: '180px', right: '350px', zIndex: 1000 }}>
                            <EmojiPicker onEmojiClick={onEmojiClick} />
                        </div>
                    )}
                    <div className="input-wrapper">
                        <textarea
                            placeholder="Write a message..."
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSendMessage();
                                }
                            }}
                        />
                        <div className="input-controls">
                            <div className="input-tools">
                                <ImageIcon className="icon" />
                                <AttachFileIcon className="icon" />
                                <GifIcon className="icon" />
                                <SentimentSatisfiedAltIcon
                                    className="icon"
                                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                />
                            </div>
                            <button
                                className="send-btn"
                                onClick={handleSendMessage}
                                disabled={!messageInput.trim()}
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="messaging-right-sidebar">
                <div className="ad-card">
                    <p>Ad · ...</p>
                    <h4 style={{ fontSize: '14px', marginBottom: '8px' }}>Sahil, unlock your full potential with LinkedIn Premium.</h4>
                    <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" alt="Ad" className="ad-image" />
                    <button style={{
                        marginTop: '12px',
                        padding: '6px 16px',
                        borderRadius: '16px',
                        border: '1px solid #0a66c2',
                        background: 'transparent',
                        color: '#0a66c2',
                        fontWeight: '600',
                        cursor: 'pointer'
                    }}>
                        Try for free
                    </button>
                </div>
            </div>
        </div>
    );
}
