'use client'

import React, { useEffect, useState, useRef } from 'react';
import './message.css';
import { io, Socket } from 'socket.io-client';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/redux/store';
import { fetchAllUserProfile } from '@/app/redux/slices/profileSlice';
import {
  apiCreateConversation,
  apiGetMessages,
} from '../../services/messageApi';
import { uploadToCloudinary } from '../../components/cloudnairy/cloudnairy';
import { BiDotsHorizontalRounded, BiEdit, BiSearchAlt2 } from 'react-icons/bi';
import { BsEmojiSmile, BsImage } from 'react-icons/bs';
import { IoMdAttach } from 'react-icons/io';

const ProfileAvatar = ({ user, className = "avatar" }: { user: any, className?: string }) => {
  if (user?.image) {
    return <img src={user.image} className={className} alt={user.fullname || 'User'} />;
  }
  if (user?.fullname) {
    return (
      <div className={`${className} avatar-placeholder`}>
        {user.fullname.charAt(0).toUpperCase()}
      </div>
    );
  }
  return <img src="/defaultimg.jpg" className={className} alt="Default User" />;
};

export default function MessagingPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { allUsers } = useSelector((state: RootState) => state.profile);
  const { currentUser } = useSelector((state: RootState) => state.auth);

  const currentUserId = currentUser?.id;

  const socketRef = useRef<Socket | null>(null);
  const conversationRef = useRef<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  const [activeUser, setActiveUser] = useState<any>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [messageInput, setMessageInput] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchAllUserProfile());
  }, []);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!currentUserId) return;

    socketRef.current = io('http://localhost:4004', {
      query: { userId: currentUserId },
    });

    socketRef.current.on('newMessage', (msg) => {
      if (
        msg.conversation?.id !== conversationRef.current &&
        msg.conversationId !== conversationRef.current
      ) return;

      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [currentUserId]);

  useEffect(() => {
    conversationRef.current = conversationId;
  }, [conversationId]);

  const handleSelectUser = async (user: any) => {
    if (!currentUserId) return;

    setActiveUser(user);
    setMessages([]);

    const convId = await apiCreateConversation(currentUserId, user.id);

    setConversationId(convId);
    conversationRef.current = convId;

    socketRef.current?.emit('joinConversation', {
      conversationId: convId,
    });

    const msgs = await apiGetMessages(convId);
    setMessages(msgs.reverse());
  };

  const handleSendMessage = () => {
    if (!messageInput.trim() || !conversationId || !currentUserId) return;

    socketRef.current?.emit('sendMessage', {
      conversationId,
      senderId: currentUserId,
      content: messageInput,
      type: 'TEXT',
    });

    setMessageInput('');
  };

  const handleFileChange = async (e: any) => {
    const file = e.target.files[0];
    if (!file || !conversationId || !currentUserId) return;

    const url = await uploadToCloudinary(file);
    const type = file.type.startsWith('video') ? 'VIDEO' : 'IMAGE';

    socketRef.current?.emit('sendMessage', {
      conversationId,
      senderId: currentUserId,
      content: url,
      type,
    });
  };

  const onEmojiClick = (emojiData: EmojiClickData) => {
    setMessageInput((prev) => prev + emojiData.emoji);
  };

  const filteredUsers = allUsers.filter(user =>
    user.id !== currentUserId &&
    user.fullname?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="messaging-container">
      <div className="messages-sidebar">
        <div className="sidebar-header">
          <h2>Messaging</h2>
          <div className="sidebar-icons">
            <BiDotsHorizontalRounded className="icon" title="More" />
            <BiEdit className="icon" title="New Message" />
          </div>
        </div>

        <div className="sidebar-search">
          <BiSearchAlt2 className="search-icon" />
          <input
            type="text"
            placeholder="Search messages"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="conversation-list">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className={`conversation-item ${activeUser?.id === user.id ? 'active' : ''}`}
              onClick={() => handleSelectUser(user)}
            >
              <ProfileAvatar user={user} className="avatar" />
              <div className="conversation-info">
                <div className="conversation-info-header">
                  <span className="conversation-name">{user.fullname}</span>
                  <span className="conversation-time"></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="chat-window">
        {activeUser ? (
          <>
            <div className="chat-header">
              <div className="chat-header-info">
                <h3>{activeUser.fullname}</h3>
              </div>
              <div className="chat-actions">    
                <BiDotsHorizontalRounded className="icon" />
              </div>
            </div>

            <div className="message-thread">
              {messages.map((msg) => {
                const isMe = msg.senderId === currentUserId;
                const sender = isMe ? currentUser : activeUser;

                return (
                  <div
                    key={msg.id}
                    className={`message-container ${isMe ? 'me' : 'other'}`}
                  >
                    {!isMe && <ProfileAvatar user={activeUser} className="message-avatar" />}
                    <div className="message-content">
                      <div className="message-bubble">
                        {msg.type === 'TEXT' && (
                          <div className="message-text">{msg.content}</div>
                        )}
                        {msg.type === 'IMAGE' && (
                          <img src={msg.content} className="chat-image" alt="Shared image" />
                        )}
                        {msg.type === 'VIDEO' && (
                          <video controls className="chat-video">
                            <source src={msg.content} />
                          </video>
                        )}
                      </div>
                      <span className="message-time">
                        {/* {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} */}
                      </span>
                    </div>
                    {isMe && <ProfileAvatar user={currentUser} className="message-avatar" />}
                  </div>
                );
              })}
              <div ref={messageEndRef} />
            </div>

            <div className="chat-input-container">
              <div className="input-wrapper">
                <textarea
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Write a message..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />

                {showEmojiPicker && (
                  <div className="emoji-picker-popup">
                    <EmojiPicker onEmojiClick={onEmojiClick} />
                  </div>
                )}

                <div className="input-controls">
                  <div className="input-tools">
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: 'none' }}
                      onChange={handleFileChange}
                    />
                    <BsImage
                      className="icon"
                      title="Add image"
                      onClick={() => fileInputRef.current?.click()}
                    />
                    <IoMdAttach className="icon" title="Attach file" />
                    <BsEmojiSmile
                      className="icon"
                      title="Emojis"
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
          </>
        ) : (
          <div className="chat-placeholder">
            <div className="placeholder-content">
              <BiEdit className="placeholder-icon" />
              <p>Select a user and start a conversation</p>
            </div>
          </div>
        )}
      </div>

      <div className="messaging-right-sidebar">
        <div className="ad-card">
          <p>Ad</p>
          <img src="/linkedin_festive_hero.png" className="ad-image" alt="Promotion" />
          <p>Upgrade to see more features</p>
        </div>
      </div>
    </div>
  );
}