'use client'

import { useEffect, useState } from 'react'
import './feed.css'
import { FcVideoCall } from "react-icons/fc"
import { HiOutlinePhoto } from "react-icons/hi2"
import { MdOutlineArticle } from "react-icons/md"
import PostModal from '@/app/components/post-modal/postModal'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/app/redux/store'
import { getPost } from '@/app/redux/slices/postSlice'
import { apiLikePost } from '@/app/services/likeApi'
import { VscThumbsup } from "react-icons/vsc"
import { BsFillHandThumbsUpFill } from "react-icons/bs"
import { FaRegCommentDots } from "react-icons/fa"
import { BiRepost } from "react-icons/bi"
import { IoIosSend } from "react-icons/io"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { apiCommentPost } from '@/app/services/commentApi'
import Comment from '@/app/components/comments/comment'

const commentSchema = z.object({
    comment: z.string().min(1)
})

type CommentInterface = z.infer<typeof commentSchema>

export default function Dashboard() {

    const [isPostModalOpen, setIsPostModalOpen] = useState(false)
    const [openComments, setOpenComments] = useState<string | null>(null)

    const dispatch = useDispatch<AppDispatch>()
    const { loading, post } = useSelector((state: RootState) => state.post)

    const { handleSubmit, register, reset } = useForm<CommentInterface>({
        resolver: zodResolver(commentSchema),
        defaultValues: { comment: '' }
    })

    useEffect(() => {
        dispatch(getPost('fetch post'))
    }, [])

    const handleLikePost = async (id: string) => {
        await apiLikePost(id)
        dispatch(getPost('fetch post'))
    }

    const onSubmit = async (data: CommentInterface, post_id: string) => {
        await apiCommentPost(post_id, { comment: data.comment })
        reset()
    }

    return (
        <main className="dashboard-layout">

            <aside className="left-sidebar">

                <div className="profile-card">
                    <div className="profile-background"></div>
                    <div className="profile-avatar">S</div>
                    <h2 className="profile-name">Sahil Kondal</h2>
                    <p className="profile-headline">Software Engineer</p>
                </div>

                <div className="profile-stats">
                    <div className="stat">
                        <span>Profile viewers</span>
                        <span className="stat-number">10</span>
                    </div>
                    <div className="stat">
                        <span>View all analytics</span>
                    </div>
                </div>

            </aside>

            <section className="main-feed">

                <div className="create-post-card">

                    <div className="create-post-input-area">
                        <div className="current-user-avatar">S</div>

                        <button
                            className="start-post-btn"
                            onClick={() => setIsPostModalOpen(true)}
                        >
                            Start a post
                        </button>
                    </div>

                    <div className="create-post-actions">
                        <button className="post-action-btn">
                            <FcVideoCall size={25} /> Video
                        </button>

                        <button className="post-action-btn">
                            <HiOutlinePhoto size={25} color='#0a66c2' /> Photo
                        </button>

                        <button className="post-action-btn">
                            <MdOutlineArticle size={25} color='#e33b3b' /> Write article
                        </button>
                    </div>

                </div>

                <div className="divider">
                    <hr />
                    <span>Sort by: Top</span>
                </div>

                {loading && (
                    <div className="loading">
                        Loading posts...
                    </div>
                )}

                {!loading && post?.map((item: any) => (

                    <div className="dashboard-post" key={item.id}>

                        <div className="post-header">

                            <div className="post-avatar">
                                {item?.author?.name?.charAt(0) || "U"}
                            </div>

                            <div className="post-info">
                                <h2 className="post-author">
                                    {item?.author?.name || "User"}
                                </h2>

                                <p className="post-title">
                                    Software Engineer
                                </p>

                                <p className="post-time">
                                    🌐
                                </p>
                            </div>

                        </div>

                        <div className="post-content">
                            <p>{item?.post}</p>
                        </div>

                        {item?.media_url && (
                            <img src={item.media_url} className='postImage' />
                        )}

                        <div className="post-footer">

                            <div className='like-count'>
                                {item.likeCount}
                            </div>

                            <div className='post-actions'>

                                <button
                                    onClick={() => handleLikePost(item.id)}
                                    className="action-btn"
                                >
                                    {item.isLiked
                                        ? <BsFillHandThumbsUpFill size={15} />
                                        : <VscThumbsup size={15} />
                                    }
                                    <span>Like</span>
                                </button>

                                <button
                                    className="action-btn"
                                    onClick={() =>
                                        setOpenComments(
                                            openComments === item.id ? null : item.id
                                        )
                                    }
                                >
                                    <FaRegCommentDots />
                                    <span>Comment</span>
                                </button>

                                <button className="action-btn">
                                    <BiRepost size={20} />
                                    <span>Repost</span>
                                </button>

                                <button className="action-btn">
                                    <IoIosSend size={20} />
                                    <span>Send</span>
                                </button>

                            </div>

                        </div>

                        {openComments === item.id && (

                            <div className='comment-body'>

                                <form
                                    className="comment-form"
                                    onSubmit={handleSubmit((data) => onSubmit(data, item.id))}
                                >
                                    <input {...register("comment")} placeholder="Write a comment..." />
                                    <button type="submit">Submit</button>
                                </form>

                                <div className='comment-section'>
                                    <Comment
                                        post_Id={item.id}
                                        parent_Id={null}
                                    />
                                </div>

                            </div>

                        )}

                    </div>

                ))}

            </section>

            <aside className="right-sidebar">

                <div className="news-card">

                    <h2 className="news-title">
                        LinkedIn News
                    </h2>

                    <ul className="news-list">

                        <li>
                            <p className="news-item-title">
                                Tech hiring surges in 2026
                            </p>

                            <p className="news-item-meta">
                                Top news • 10,234 readers
                            </p>
                        </li>

                        <li>
                            <p className="news-item-title">
                                The rise of AI engineers
                            </p>

                            <p className="news-item-meta">
                                1d ago • 5,432 readers
                            </p>
                        </li>

                        <li>
                            <p className="news-item-title">
                                Remote work policies updated
                            </p>

                            <p className="news-item-meta">
                                2d ago • 8,912 readers
                            </p>
                        </li>

                    </ul>

                </div>

                <div className="ad-card">
                    <p className="ad-text">promoted...</p>
                    <p className="ad-content">promotion</p>
                </div>

            </aside>

            {isPostModalOpen &&
                <PostModal setIsPostModalOpen={setIsPostModalOpen} />
            }

        </main>
    )
}