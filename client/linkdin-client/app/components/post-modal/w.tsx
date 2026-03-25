'use client'

import { BsCardImage, BsEmojiSmile } from "react-icons/bs";
import { MdOutlineCalendarMonth, MdAdd, MdClose } from "react-icons/md";
import { FcCalendar, FcSurvey } from "react-icons/fc";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { uploadToCloudinary } from "../cloudnairy/cloudnairy";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { apipost } from "@/app/services/postApi";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store";
import { getPost } from "@/app/redux/slices/postSlice";
import PublicIcon from '@mui/icons-material/Public';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import './postModal.css'

const schema = z.object({
    text: z.string().min(1),
    media: z.any().optional()
})

export default function PostModal({ setIsPostModalOpen }: any) {
    const dispatch = useDispatch<AppDispatch>()
    const { currentUser } = useSelector((state: RootState) => state.auth)

    const { register, handleSubmit, setValue, watch, reset } = useForm({
        resolver: zodResolver(schema)
    })

    const [showEmoji, setShowEmoji] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const text = watch("text") || ""
    const media = watch("media")

    const file = media?.[0]
    const previewUrl = file ? URL.createObjectURL(file) : null

    const handleEmojiClick = (emojiData: any) => {
        setValue("text", text + emojiData.emoji)
    }

    const onSubmit = async (data: any) => {
        setIsLoading(true)
        try {
            let media_url = null
            const file = data.media?.[0]

            if (file) {
                const uploadedUrl = await uploadToCloudinary(file)
                media_url = uploadedUrl
            }

            const postData = {
                post: data.text,
                media_url
            }

            await apipost(postData)
            dispatch(getPost({ page: 1, limit: 5, sortBy: 'recent' }))
            reset()
            setIsPostModalOpen(false)
        } catch (error) {
            console.error("Post creation failed:", error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="post-modal-overlay">
            <div className="post-modal-container">
                <div className="post-modal-content">
                    <div className="post-modal-header">
                        <h2 className="modal-title">Create a post</h2>
                        <button className="close-modal-btn" onClick={() => setIsPostModalOpen(false)}>
                            <MdClose size={24} />
                        </button>
                    </div>

                    {/* <div className="post-modal-user-row">
                        <div className="user-avatar-small">
                            {currentUser?.image ? (
                                <img src={currentUser.image} alt="" className="avatar-img" />
                            ) : (
                                <div className="avatar-placeholder-small">{currentUser?.fullname?.[0] || "?"}</div>
                            )}
                        </div>
                        <div className="user-selection-info">
                            <h4 className="user-fullName">{currentUser?.fullname || "User Name"}</h4>
                            <button className="visibility-picker">
                                <PublicIcon sx={{ fontSize: 16 }} />
                                <span>Anyone</span>
                                <ArrowDropDownIcon />
                            </button>
                        </div>
                    </div> */}

                    <form className="post-creation-form" onSubmit={handleSubmit(onSubmit)}>
                        <div className="post-modal-body">
                            <textarea
                                className="post-textarea-field"
                                placeholder="What do you want to talk about?"
                                autoFocus
                                {...register("text")}
                            ></textarea>

                            {showEmoji && (
                                <div className="emoji-picker-container">
                                    <EmojiPicker onEmojiClick={handleEmojiClick} width="100%" height={350} />
                                </div>
                            )}

                            {previewUrl && (
                                <div className="media-preview-area">
                                    <button className="remove-media-btn" onClick={() => setValue("media", null)}>
                                        <MdClose size={20} />
                                    </button>
                                    {file.type.startsWith("image") ? (
                                        <img src={previewUrl} alt="preview" className="preview-img" />
                                    ) : (
                                        <video src={previewUrl} controls className="preview-video" />
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="post-modal-actions-bar">
                            <div className="utility-icons">
                                <label className="action-icon-btn">
                                    <BsCardImage size={24} color="#666" />
                                    <input
                                        type="file"
                                        accept="image/*,video/*"
                                        {...register("media")}
                                        hidden
                                    />
                                </label>
                                <button type="button" className="action-icon-btn">
                                    <FcCalendar size={24} />
                                </button>
                                <button type="button" className="action-icon-btn">
                                    <FcSurvey size={24} />
                                </button>
                                <button
                                    type="button"
                                    className="action-icon-btn"
                                    onClick={() => setShowEmoji(!showEmoji)}
                                >
                                    <BsEmojiSmile size={22} color="#666" />
                                </button>
                                <button type="button" className="action-icon-btn">
                                    <MdAdd size={24} color="#666" />
                                </button>
                            </div>

                            <button
                                type="submit"
                                className="post-submit-button"
                                disabled={!text.trim() || isLoading}
                            >
                                {isLoading ? "Posting..." : "Post"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}