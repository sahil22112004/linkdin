'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useEffect, useState, useCallback, useRef } from 'react'
import { apiCommentPost, apiFetchComments } from '@/app/services/commentApi'
import './comment.css'
import Image from 'next/image'

type CommentType = {
    id: string
    user_Id: string
    comment: string
    haveReply: boolean
    createdAt: string
    user?: {
        name: string
        image?: string
        headline?: string
    }
}

type Props = {
    post_Id: string
    parent_Id: string | null
}

const commentSchema = z.object({
    comment: z.string().min(1)
})

type CommentInterface = z.infer<typeof commentSchema>

export default function Comment({ post_Id, parent_Id }: Props) {
    const [comments, setComments] = useState<CommentType[]>([])
    const [replyBox, setReplyBox] = useState<string | null>(null)
    const [openReplies, setOpenReplies] = useState<string | null>(null)
    const [offset, setOffset] = useState(0)
    const [hasMore, setHasMore] = useState(false)
    const [loading, setLoading] = useState(false)
    const LIMIT = 3

    const fetchComments = useCallback(async (currentOffset: number) => {
        try {
            setLoading(true)
            const res = await apiFetchComments(post_Id, parent_Id, currentOffset, LIMIT)

            if (currentOffset === 0) {
                setComments(res)
            } else {
                setComments(prev => {
                    const existingIds = new Set(prev.map(c => c.id))
                    const newUniqueComments = res.filter((c: CommentType) => !existingIds.has(c.id))
                    return [...prev, ...newUniqueComments]
                })
            }

            setHasMore(res.length === LIMIT)
        } catch (error) {
            console.error("Error fetching comments", error)
        } finally {
            setLoading(false)
        }
    }, [post_Id, parent_Id, LIMIT])

    useEffect(() => {
        setOffset(0)
        fetchComments(0)
    }, [fetchComments])

    const handleLoadMore = () => {
        const nextOffset = offset + LIMIT
        setOffset(nextOffset)
        fetchComments(nextOffset)
    }

    const { handleSubmit, register, reset } = useForm<CommentInterface>({
        resolver: zodResolver(commentSchema),
        defaultValues: { comment: '' }
    })

    const onSubmit = async (data: CommentInterface, comment_Id: string) => {
        try {
            await apiCommentPost(post_Id, {
                comment_id: comment_Id,
                comment: data.comment
            })
            reset()
            setReplyBox(null)
            // After posting a comment, refresh the first set
            setOffset(0)
            fetchComments(0)
        } catch (error) {
            console.error("Error posting comment", error)
        }
    }

    return (
        <div className={`comments-container ${parent_Id ? 'replies-container' : 'top-level'}`}>
            {comments.map((comment) => (
                <div key={comment.id} className="comment-thread">
                    <div className="comment-main">
                        <div className="user-avatar-container">
                            <div className="user-avatar">
                                {comment.user?.image ? (
                                    <Image src={comment.user.image} alt={comment.user.name} width={32} height={32} />
                                ) : (
                                    <span>{comment.user?.name?.[0] || 'S'}</span>
                                )}
                            </div>
                        </div>

                        <div className="comment-content-wrapper">
                            <div className="comment-bubble">
                                <div className="comment-header">
                                    <div className="user-details">
                                        <span className="author-name">{comment.user?.name || "SAHIL KONDAL"}</span>
                                        <span className="author-headline">{comment.user?.headline || "Full Stack Developer"}</span>
                                    </div>
                                    <span className="comment-time">3h</span>
                                </div>
                                <div className="comment-text">
                                    {comment.comment}
                                </div>
                            </div>

                            <div className="comment-actions">
                                <span className="action-btn">Like</span>
                                <span className="action-divider">|</span>
                                <span
                                    className="action-btn"
                                    onClick={() => setReplyBox(replyBox === comment.id ? null : comment.id)}
                                >
                                    Reply
                                </span>
                            </div>

                            {replyBox === comment.id && (
                                <form
                                    className="reply-form"
                                    onSubmit={handleSubmit((data) => onSubmit(data, comment.id))}
                                >
                                    <input {...register("comment")} placeholder="Add a reply..." autoFocus />
                                    <div className="form-actions">
                                        <button type="submit">Post</button>
                                    </div>
                                </form>
                            )}

                            {comment.haveReply && (
                                <div
                                    className="show-replies-btn"
                                    onClick={() => setOpenReplies(openReplies === comment.id ? null : comment.id)}
                                >
                                    <span className="replies-icon">
                                        {openReplies === comment.id ? "▲" : "▼"}
                                    </span>
                                    {openReplies === comment.id ? "Hide Replies" : "Show Replies"}
                                </div>
                            )}

                            {openReplies === comment.id && (
                                <div className="replies-list">
                                    <Comment
                                        post_Id={post_Id}
                                        parent_Id={comment.id}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}

            {hasMore && (
                <button
                    className="load-more-comments"
                    onClick={handleLoadMore}
                    disabled={loading}
                >
                    {loading ? "Loading..." : "Load more comments"}
                </button>
            )}
        </div>
    )
}



