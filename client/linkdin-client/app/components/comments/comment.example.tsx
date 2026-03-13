'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useEffect, useState } from 'react'
import { apiCommentPost, apiFetchComments } from '@/app/services/commentApi'

type CommentType = {
    id: string
    user_Id: string
    post_Id: string
    comment: string
    haveReply: boolean
}

type Props = {
    post_Id: string
    parent_Id: string | null
}

const commentSchema = z.object({
    comment: z.string().min(1, 'comment cannot be empty')
})

type CommentInterface = z.infer<typeof commentSchema>

export default function Comment({ post_Id, parent_Id }: Props) {

    const [comments, setComments] = useState<CommentType[]>([])
    const [showReply, setShowReply] = useState<boolean>(false)
    const [isRepling, setisRepling] = useState<boolean>(false)

    const fetchComments = async (post_Id: string, parent_Id: string | null, offset: number = 0) => {
        const res = await apiFetchComments(post_Id, parent_Id, offset, 10)
        setComments(res)
    }

    useEffect(() => {
        fetchComments(post_Id, parent_Id)
    }, [post_Id, parent_Id])

    const { handleSubmit, register, reset, formState: { errors } } = useForm<CommentInterface>({
        resolver: zodResolver(commentSchema),
        defaultValues: { comment: '' }
    })

    const onSubmit = async (data: CommentInterface ,comment_Id:string) => {
        const Comment ={
            comment_id:comment_Id,
            comment:data.comment
        }
        const res = apiCommentPost(post_Id,Comment)
        console.log(data)
        reset()
    }


    return (
        <>
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
                                    onClick={() => setisRepling(!isRepling)}
                                >
                                    Reply
                                </span>
                            </div>

                            {isRepling && <form className="comment-form" onSubmit={handleSubmit((data) => onSubmit(data, comment.id))}>
                                <input {...register("comment")} placeholder="Write a comment..." />
                                {errors.comment && <p>{errors.comment.message}</p>}
                                <button type="submit">Submit</button>
                            </form>}

                            {comment.haveReply && (
                                <span
                                    className="load-more"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => setShowReply(!showReply)}
                                >
                                    Show Replies
                                </span>
                            )}

                            <div style={{ marginLeft: "40px" }}>
                                {showReply && (
                                    <Comment
                                        post_Id={post_Id}
                                        parent_Id={comment.id}
                                    />
                                )}
                            </div>

                        </div>


                    </div>

                ))}
            </div>
        </>
    )
}