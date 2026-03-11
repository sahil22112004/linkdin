"use client"

import React, { useEffect, useState, useRef } from 'react'
import './message.css'
import { io, Socket } from "socket.io-client"
import SearchIcon from '@mui/icons-material/Search'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import EditIcon from '@mui/icons-material/Edit'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import ImageIcon from '@mui/icons-material/Image'
import AttachmentIcon from '@mui/icons-material/Attachment'
import GifBoxIcon from '@mui/icons-material/GifBox'
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt'

type Message = {
    id: string
    sender_Id: string
    reciver_Id: string
    message: string
    chat_room_Id: string
    receivedAt: string
}

export default function MessagingPage() {

    const [socket, setSocket] = useState<Socket | null>(null)
    const [messages, setMessages] = useState<Message[]>([])
    const [messageInput, setMessageInput] = useState("")
    const [typingUser, setTypingUser] = useState("")
    const chatRoom = "room1"
    const senderId = "user1"
    const receiverId = "user2"

    const bottomRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {

        const newSocket = io("http://localhost:3002")

        setSocket(newSocket)

        newSocket.emit("joinRoom", {
            chat_room_Id: chatRoom
        })

        newSocket.on("receiveMessage", (msg: Message) => {
            setMessages(prev => [...prev, msg])
        })

        newSocket.on("userTyping", (data: any) => {
            if (data.userId !== senderId) {
                setTypingUser(data.userId)
            }
        })

        newSocket.on("userStopTyping", () => {
            setTypingUser("")
        })

        return () => {
            newSocket.disconnect()
        }

    }, [])

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    const sendMessage = () => {

        if (!messageInput.trim()) return

        socket?.emit("sendMessage", {
            chat_room_Id: chatRoom,
            sender_Id: senderId,
            reciver_Id: receiverId,
            message: messageInput
        })

        setMessageInput("")
    }

    const handleTyping = (value: string) => {

        setMessageInput(value)

        socket?.emit("typing", {
            chat_room_Id: chatRoom,
            sender_Id: senderId
        })

        setTimeout(() => {
            socket?.emit("stopTyping", {
                chat_room_Id: chatRoom,
                sender_Id: senderId
            })
        }, 1000)
    }

    return (

        <div style={{ backgroundColor: "#f4f2ee", minHeight: "100vh" }}>

            <div className="messaging-layout">

                <main className="messaging-main-card">

                    <aside className="message-list-pane">

                        <div className="message-list-header">

                            <div className="message-list-header-left">
                                <h2>Messaging</h2>

                                <div className="message-search-box">
                                    <SearchIcon className="message-search-icon" />
                                    <input type="text" placeholder="Search messages" />
                                </div>

                            </div>

                            <div className="message-list-actions">
                                <MoreHorizIcon />
                                <EditIcon />
                            </div>

                        </div>

                        <div className="message-filters">
                            <button className="filter-pill active">
                                Focused <ArrowDropDownIcon />
                            </button>
                            <button className="filter-pill">Jobs</button>
                            <button className="filter-pill">Unread</button>
                            <button className="filter-pill">Connections</button>
                            <button className="filter-pill">InMail</button>
                            <button className="filter-pill">Starred</button>
                        </div>

                        <div className="message-list"></div>

                    </aside>

                    <section className="chat-pane">

                        <div className="chat-header">

                            <div className="chat-header-user">

                                <div className="chat-header-name">
                                    vikas sangwan <span className="chat-active-text">• 1st</span>
                                </div>

                                <div className="chat-header-title green">
                                    <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#01754f' }}></div>
                                    Mobile
                                </div>

                            </div>

                            <div className="chat-header-actions">
                                <MoreHorizIcon />
                                <StarBorderIcon />
                            </div>

                        </div>

                        <div className="chat-content">

                            {messages.map(msg => (

                                <div
                                    key={msg.id}
                                    className={`chat-message ${msg.sender_Id === senderId ? "own" : ""}`}
                                >

                                    <img
                                        src="https://i.pravatar.cc/150?img=12"
                                        className="chat-message-avatar"
                                    />

                                    <div className="chat-message-body">

                                        <div className="chat-message-header">
                                            <span className="chat-message-author">
                                                {msg.sender_Id === senderId ? "You" : "vikas sangwan"}
                                            </span>

                                            <span className="chat-message-time">
                                                {new Date(msg.receivedAt).toLocaleTimeString()}
                                            </span>

                                        </div>

                                        <div>{msg.message}</div>

                                    </div>

                                </div>

                            ))}

                            {typingUser && (
                                <div className="typing-indicator">
                                    typing...
                                </div>
                            )}

                            <div ref={bottomRef}></div>

                        </div>

                        <div className="chat-input-area">

                            <textarea
                                className="chat-input-box"
                                placeholder="Write a message..."
                                value={messageInput}
                                onChange={(e) => handleTyping(e.target.value)}
                            ></textarea>

                            <div className="chat-input-actions">

                                <div className="chat-input-icons">
                                    <ImageIcon />
                                    <AttachmentIcon />
                                    <GifBoxIcon />
                                    <SentimentSatisfiedAltIcon />
                                </div>

                                <div className="send-btn-group">

                                    <button
                                        className={`send-btn ${messageInput.trim() ? 'active' : ''}`}
                                        onClick={sendMessage}
                                    >
                                        Send
                                    </button>

                                    <MoreHorizIcon />

                                </div>

                            </div>

                        </div>

                    </section>

                </main>

            </div>

        </div>

    )

}