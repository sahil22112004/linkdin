'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useEffect, useState } from 'react'
import { apiCommentPost, apiFetchComments } from '@/app/services/commentApi'
import './comment.css'

type CommentType = {
    id: string
    user_Id: string
    comment: string
    haveReply: boolean
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

    const fetchComments = async () => {
        const res = await apiFetchComments(post_Id, parent_Id, 0, 10)
        setComments(res)
    }

    useEffect(() => {
        fetchComments()
    }, [post_Id, parent_Id])

    const { handleSubmit, register, reset } = useForm<CommentInterface>({
        resolver: zodResolver(commentSchema),
        defaultValues: { comment: '' }
    })

    const onSubmit = async (data: CommentInterface, comment_Id: string) => {

        await apiCommentPost(post_Id, {
            comment_id: comment_Id,
            comment: data.comment
        })

        reset()
        setReplyBox(null)
        fetchComments()
    }

    return (
        <div className="comments-container">

            {comments.map((comment) => (

                <div key={comment.id} className="comment-item">

                    <div className="user-info">
                        <div className="user-logo">S</div>
                        <div className="user-name">SAHIL KONDAL</div>
                    </div>

                    <div className="comment">

                        {comment.comment}

                        <div className="comment-actions">

                            <span>Like</span>

                            <span
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                    setReplyBox(
                                        replyBox === comment.id ? null : comment.id
                                    )
                                }
                            >
                                Reply
                            </span>

                        </div>

                        {replyBox === comment.id && (

                            <form
                                className="comment-form"
                                onSubmit={handleSubmit((data) => onSubmit(data, comment.id))}
                            >
                                <input {...register("comment")} placeholder="Write a reply..." />
                                <button type="submit">Submit</button>
                            </form>

                        )}

                        {comment.haveReply && (

                            <span
                                className="load-more"
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                    setOpenReplies(
                                        openReplies === comment.id ? null : comment.id
                                    )
                                }
                            >
                                {openReplies === comment.id ? "Hide Replies" : "Show Replies"}
                            </span>

                        )}

                        <div style={{ marginLeft: "40px" }}>

                            {openReplies === comment.id && (

                                <Comment
                                    post_Id={post_Id}
                                    parent_Id={comment.id}
                                />

                            )}

                        </div>

                    </div>

                </div>

            ))}

            <span className='load-more-replies'> Load More</span>

        </div>
    )
}



