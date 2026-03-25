'use client'

import { useCallback, useEffect, useState } from 'react'
import './example.css'
import { FcVideoCall } from "react-icons/fc"
import { HiOutlinePhoto } from "react-icons/hi2"
import { MdArrowDropDown, MdOutlineArticle } from "react-icons/md"
import PostModal from '@/app/components/post-modal/postModal'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/app/redux/store'
import { getPost, setSortBy } from '@/app/redux/slices/postSlice'
import { apiLikePost } from '@/app/services/likeApi'
import { FaRegCommentDots } from "react-icons/fa"
import { BiRepost } from "react-icons/bi"
import { IoIosSend } from "react-icons/io"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { apiCommentPost } from '@/app/services/commentApi'
import Comment from '@/app/components/comments/comment'
import { apirepost } from '@/app/services/postApi'
import { IoMdBookmark } from "react-icons/io";
import { MdGroups } from "react-icons/md";
import { RiNewsLine } from "react-icons/ri";
import { IoIosCalendar } from "react-icons/io";
import { useRouter } from 'next/navigation'
import { fetchUserProfile } from '@/app/redux/slices/authSlics'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';



const commentSchema = z.object({
    comment: z.string().min(1)
})

type CommentInterface = z.infer<typeof commentSchema>

export default function Dashboard() {

    const router = useRouter()

    const [isPostModalOpen, setIsPostModalOpen] = useState(false)
    const [openComments, setOpenComments] = useState<string | null>(null)
    const [isSortMenuOpen, setIsSortMenuOpen] = useState(false)
    const dispatch = useDispatch<AppDispatch>()
    const { loading, posts, page, limit, totalPages, sortBy } = useSelector((state: RootState) => state.post)
    const { currentUser } = useSelector((state: RootState) => state.auth)

    const loadMore = useCallback(() => {
        if (!loading && page < totalPages) {
            dispatch(getPost({ page: page + 1, limit, sortBy }));
        }
    }, [loading, page, totalPages, dispatch, limit, sortBy]);

    useEffect(() => {
        const onScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 50) {
                loadMore();
            }
        };
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, [loadMore]);


    const { handleSubmit, register, reset } = useForm<CommentInterface>({
        resolver: zodResolver(commentSchema),
        defaultValues: { comment: '' }
    })

    useEffect(() => {
        dispatch(getPost({ page: 1, limit, sortBy }))
        dispatch(fetchUserProfile())
    }, [dispatch, limit, sortBy])

    const handleLikePost = async (id: string) => {
        await apiLikePost(id)
        dispatch(getPost({ page: 1, limit, sortBy }))
    }

    const onSubmit = async (data: CommentInterface, post_id: string) => {
        await apiCommentPost(post_id, { comment: data.comment })
        reset()
    }

    const handleRePost = async (post_Id: string) => {
        const res = await apirepost(post_Id)
        dispatch(getPost({ page: 1, limit, sortBy }))
    }

    return (
        <main className="dashboard-layout">

            <aside className="left-sidebar">

                <div className="profile-card">
                    <div className="profile-background" style={{
                        backgroundImage: currentUser?.coverimage ? `url(${currentUser.coverimage})` : 'none',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}></div>
                    <div className="profile-avatar">
                        {currentUser?.image ? (
                            <img src={currentUser.image} alt="Profile" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                        ) : currentUser?.fullname ? (
                            currentUser.fullname[0]
                        ) : (
                            <img src="/defaultimg.jpg" alt="Default" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                        )}
                    </div>
                    <div onClick={() => router.push('/profile')} >

                        <h2 className="profile-name">{currentUser?.fullname ? currentUser.fullname : ""}</h2>
                        <p className="profile-headline">{currentUser?.description ? currentUser.description : ""}</p>
                    </div>
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
                <div className="profile-stats-1">
                    <div className="stat-1">
                        <span className='stat-logo'><IoMdBookmark size={20} /></span>
                        <span>Saved items</span>

                    </div>
                    <div className="stat-1">
                        <span className='stat-logo'><MdGroups size={20} /></span>
                        <span>groups</span>
                    </div>
                    <div className="stat-1">
                        <span className='stat-logo'><RiNewsLine size={20} /></span>
                        <span>Newsletters</span>
                    </div>
                    <div className="stat-1">
                        <span className='stat-logo'><IoIosCalendar size={20} /></span>
                        <span>Events</span>
                    </div>
                </div>

            </aside>

            <section className="main-feed">

                <div className="create-post-card">

                    <div className="create-post-input-area">
                        <div className="current-user-avatar">
                            {currentUser?.image ? (
                                <img src={currentUser.image} alt="Profile" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                            ) : currentUser?.fullname ? (
                                currentUser.fullname[0]
                            ) : (
                                <img src="/defaultimg.jpg" alt="Default" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                            )}
                        </div>

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

                <div className="feed-divider-container">
                    <div className="divider-line"></div>
                    <div className="sort-by-selector" onClick={() => setIsSortMenuOpen(!isSortMenuOpen)}>
                        <span className="sort-label">Sort by:</span>
                        <span className="sort-value">{sortBy === 'likes' ? 'Top' : 'Recent'}</span>
                        <MdArrowDropDown size={20} />

                        {isSortMenuOpen && (
                            <div className="sort-dropdown-menu">
                                <div className={`sort-menu-item ${sortBy === 'likes' ? 'active' : ''}`} onClick={(e) => {
                                    e.stopPropagation();
                                    dispatch(setSortBy('likes'));
                                    setIsSortMenuOpen(false)
                                }}>Top</div>
                                <div className={`sort-menu-item ${sortBy === 'recent' ? 'active' : ''}`} onClick={(e) => {
                                    e.stopPropagation();
                                    dispatch(setSortBy('recent'));
                                    setIsSortMenuOpen(false)
                                }}>Recent</div>
                            </div>
                        )}
                    </div>
                </div>

                {loading && (
                    <div className="loading">
                        Loading posts...
                    </div>
                )}

                {!loading && posts?.map((item: any) => (

                    <div className="dashboard-post" key={item.feedId}>
                        {item.repostedBy && <span style={{
                            color: 'black',
                            margin: '10px 0 0 10px ',
                            marginTop: '10px',
                            fontSize: '13px',
                            display: 'block'
                        }}>
                            <span style={{ fontWeight: 'bold' }}>
                                {item.repostedBy}
                            </span> reposted this
                        </span>}

                        <div className="post-header">

                            <div className="post-avatar">
                                {item?.author?.image ? (
                                    <img src={item.author.image} alt="Author" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                                ) : (
                                    item?.author?.name?.charAt(0) || "U"
                                )}
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
                            item.media_url.includes("video")
                                ? <video controls className="postVideo">
                                    <source src={item.media_url} />
                                </video>
                                : <img src={item.media_url} className="postImage" />
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
                                        ? <ThumbUpOutlinedIcon sx={{ fontSize: 18 }} />
                                        : <ThumbUpIcon sx={{ fontSize: 18 }} />
                                    }
                                    <span>Like</span>
                                </button>

                                <button
                                    className="action-btn"
                                    onClick={() =>
                                        setOpenComments(
                                            openComments === item.feedId ? null : item.feedId
                                        )
                                    }
                                >
                                    <FaRegCommentDots size={18} />
                                    <span>Comment</span>
                                </button>

                                <button
                                    className="action-btn"
                                    onClick={() => handleRePost(item.id)}
                                >
                                    <BiRepost size={18} />
                                    <span>Repost</span>
                                </button>

                                <button className="action-btn">
                                    <IoIosSend size={20} />
                                    <span>Send</span>
                                </button>

                            </div>

                        </div>

                        {openComments === item.feedId && (

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
                    <img src="/linkedin_festive_hero.png" className="ad-image" alt="Promotion" height={280} width={20} />
                    <p className="ad-content">Upgrade to see more features</p>
                </div>

            </aside>

            {isPostModalOpen &&
                <div className='postModal'><PostModal setIsPostModalOpen={setIsPostModalOpen} /></div>
            }

        </main>
    )
}