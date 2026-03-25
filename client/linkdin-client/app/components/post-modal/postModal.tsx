import { BsCardImage } from "react-icons/bs";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import { BsEmojiSmile } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { uploadToCloudinary } from "../cloudnairy/cloudnairy";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { apipost } from "@/app/services/postApi";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/redux/store";
import { getPost } from "@/app/redux/slices/postSlice";
import './postModal.css'

const schema = z.object({
    text: z.string().min(1),
    media: z.any().optional()
})

export default function PostModal({ setIsPostModalOpen }: any) {

    const dispatch = useDispatch<AppDispatch>()

    const { register, handleSubmit, setValue, watch ,reset} = useForm({
        resolver: zodResolver(schema)
    })

    const [showEmoji, setShowEmoji] = useState(false)

    const text = watch("text") || ""
    const media = watch("media")

    const file = media?.[0]
    const previewUrl = file ? URL.createObjectURL(file) : null

    const handleEmojiClick = (emojiData: any) => {
        setValue("text", text + emojiData.emoji)
    }

    const onSubmit = async (data: any) => {

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

        const res = await apipost(postData)
        dispatch(getPost({ page: 1, limit: 5, sortBy: 'recent' }))

        reset()
        setIsPostModalOpen(false)

        console.log(res)
    }

    return (
        <div className="post-modal-overlay">
            <div className="post-modal">

                <div className="post-modal-header">
                    <div className="post-modal-user-info">
                        <div className="post-modal-avatar">S</div>
                        <div className="post-modal-name">Sahil Kondal</div>
                    </div>
                    <button className="post-modal-close" onClick={() => setIsPostModalOpen(false)}>×</button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="post-modal-body">

                        <textarea
                            className="post-modal-textarea"
                            placeholder="What do you want to talk about?"
                            autoFocus
                            {...register("text")}
                        />

                        {showEmoji && (
                            <div className="emojiBox">
                                <EmojiPicker onEmojiClick={handleEmojiClick} />
                            </div>
                        )}

                        {previewUrl && (
                            <div className="post-media-preview">
                                {file.type.startsWith("image") && (
                                    <img src={previewUrl} alt="preview" />
                                )}

                                {file.type.startsWith("video") && (
                                    <video src={previewUrl} controls />
                                )}
                            </div>
                        )}

                    </div>

                    <div className="post-modal-footer">
                        <div className="post-modal-footer-actions">

                            <button
                                type="button"
                                className="post-action-btn emoji-btn"
                                onClick={() => setShowEmoji(!showEmoji)}
                            >
                                <BsEmojiSmile size={25} />
                            </button>

                            <label className="post-action-btn media-btn">
                                <BsCardImage size={25} />
                                <input
                                    type="file"
                                    accept="image/*,video/*"
                                    {...register("media")}
                                    hidden
                                />
                            </label>

                            <button type="button" className="post-action-btn event-btn">
                                <MdOutlineCalendarMonth size={25} />
                            </button>

                            <button type="button" className="post-action-btn event-btn">
                                <MdAdd size={25} />
                            </button>

                        </div>

                        <button type="submit" className="post-modal-submit-btn">Post</button>
                    </div>

                </form>
            </div>
        </div>
    )
}