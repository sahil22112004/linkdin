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
import { apiFetchComments, apiCommentPost } from '@/app/services/commentApi'
import { VscThumbsup } from "react-icons/vsc"
import { BsFillHandThumbsUpFill } from "react-icons/bs"
import { FaRegCommentDots } from "react-icons/fa"
import { BiRepost } from "react-icons/bi"
import { IoIosSend } from "react-icons/io"

export default function Dashboard() {

const [isPostModalOpen,setIsPostModalOpen] = useState(false)

const dispatch = useDispatch<AppDispatch>()
const {loading,post} = useSelector((state:RootState)=>state.post)

const [comments,setComments] = useState<any>({})
const [showComments,setShowComments] = useState<any>({})
const [commentOffset,setCommentOffset] = useState<any>({})

const [replies,setReplies] = useState<any>({})
const [replyOffset,setReplyOffset] = useState<any>({})

const [commentInput,setCommentInput] = useState<any>({})
const [replyInput,setReplyInput] = useState<any>({})

useEffect(()=>{
dispatch(getPost('fetch post'))
},[])

const handleLikePost = async(id:any)=>{
await apiLikePost(id)
dispatch(getPost('fetch post'))
}

const loadComments = async(postId:string)=>{

const offset = commentOffset[postId] || 0

const data = await apiFetchComments(postId,null,5,offset)

setComments((prev:any)=>({
...prev,
[postId]: offset===0 ? data : [...(prev[postId] || []),...data]
}))

setCommentOffset((prev:any)=>({
...prev,
[postId]: offset + 5
}))

setShowComments((prev:any)=>({
...prev,
[postId]: true
}))
}

const loadReplies = async(postId:string,commentId:string)=>{

const key = `${postId}_${commentId}`
const offset = replyOffset[key] || 0

const data = await apiFetchComments(postId,commentId,3,offset)

setReplies((prev:any)=>({
...prev,
[key]: offset===0 ? data : [...(prev[key] || []),...data]
}))

setReplyOffset((prev:any)=>({
...prev,
[key]: offset + 3
}))
}

const createComment = async(postId:string)=>{

if(!commentInput[postId]) return

await apiCommentPost(postId,null)

setCommentInput((prev:any)=>({
...prev,
[postId]:""
}))

loadComments(postId)
}

const createReply = async(postId:string,commentId:string)=>{

const key = `${postId}_${commentId}`

if(!replyInput[key]) return

await apiCommentPost(postId,commentId)

setReplyInput((prev:any)=>({
...prev,
[key]:""
}))

loadReplies(postId,commentId)
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
onClick={()=>setIsPostModalOpen(true)}
>
Start a post
</button>

</div>

<div className="create-post-actions">

<button className="post-action-btn">
<FcVideoCall size={25}/> Video
</button>

<button className="post-action-btn">
<HiOutlinePhoto size={25} color='#0a66c2'/> Photo
</button>

<button className="post-action-btn">
<MdOutlineArticle size={25} color='#e33b3b'/> Write article
</button>

</div>

</div>

<div className="divider">
<hr/>
<span>Sort by: Top</span>
</div>

{loading && (
<div className="loading">
Loading posts...
</div>
)}

{!loading && post?.length === 0 && (
<div className="loading">
No posts available
</div>
)}

{!loading && post?.map((item:any)=>(

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
<img src={item.media_url} className='postImage'/>
)}

<div className="post-footer">

<div className='like-count'>
{item.likeCount}
</div>

<div className='post-actions'>

<button
onClick={()=>handleLikePost(item.id)}
className="action-btn"
>
{item.isLiked
? <BsFillHandThumbsUpFill size={15}/>
: <VscThumbsup size={15}/>}
<span>Like</span>
</button>

<button
className="action-btn"
onClick={()=>loadComments(item.id)}
>
<FaRegCommentDots/>
<span>Comment</span>
</button>

<button className="action-btn">
<BiRepost size={20}/>
<span>Repost</span>
</button>

<button className="action-btn">
<IoIosSend size={20}/>
<span>Send</span>
</button>

</div>

</div>

{showComments[item.id] && (

<div className="comment-section">

<div className="comment-input">

<input
placeholder="Add a comment..."
value={commentInput[item.id] || ""}
onChange={(e)=>setCommentInput((prev:any)=>({
...prev,
[item.id]:e.target.value
}))}
/>

<button
onClick={()=>createComment(item.id)}
>
Post
</button>

</div>

{comments[item.id]?.map((comment:any)=>{

const key = `${item.id}_${comment.id}`

return (

<div key={comment.id} className="comment-box">

<div className="comment-avatar">
{comment.user_Id?.charAt(0) || "U"}
</div>

<div className="comment-content">

<p className="comment-user">
{comment.user_Id}
</p>

<p className="comment-text">
Comment
</p>

<div className="comment-actions">

<button
onClick={()=>loadReplies(item.id,comment.id)}
>
Reply
</button>

</div>

<div className="reply-input">

<input
placeholder="Reply..."
value={replyInput[key] || ""}
onChange={(e)=>setReplyInput((prev:any)=>({
...prev,
[key]:e.target.value
}))}
/>

<button
onClick={()=>createReply(item.id,comment.id)}
>
Reply
</button>

</div>

{replies[key]?.map((reply:any)=>(
<div key={reply.id} className="reply-box">

<div className="comment-avatar small">
{reply.user_Id?.charAt(0) || "U"}
</div>

<div>

<p className="comment-user">
{reply.user_Id}
</p>

<p className="comment-text">
Reply
</p>

</div>

</div>
))}

<button
className="load-replies"
onClick={()=>loadReplies(item.id,comment.id)}
>
Load more replies
</button>

</div>

</div>

)

})}

<button
className="load-more-comments"
onClick={()=>loadComments(item.id)}
>
Load more comments
</button>

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

<p className="ad-text">
promoted...
</p>

<p className="ad-content">
promotion
</p>

</div>

</aside>

{isPostModalOpen &&
<PostModal setIsPostModalOpen={setIsPostModalOpen}/>
}

</main>

)
}