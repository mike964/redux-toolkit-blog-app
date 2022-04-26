import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import PostAuthor from './PostAuthor'
// import { selectPostById } from './postsSlice'
import ReactionBtns from './ReactionBtns'
import TimeAgo from './TimeAgo'

// const SinglePostPage = ({ match }) => {
// * No Need for match, use useParams() instead
const SinglePostPage = () => {
	console.log('SinglePostPage..')
	const { postId } = useParams() // retrieve postId
	console.log(postId)

	const post = useSelector(
		// state => state.posts.posts.find(post => post.id === postId)
		state => state.posts.find(post => post.id === postId)
		// console.log(state)
	)
	// const post = useSelector(state => selectPostById(state, Number(postId)))
	console.log(post)

	if (!post) {
		return (
			<section>
				<h2>Post not found!</h2>
			</section>
		)
	}

	return (
		<div>
			<article className='post'>
				<h2>{post.title}</h2>
				<p>{post.body}</p>
				<p className='postCredit'>
					{/* <Link to={`/post/edit/${post.id}`}>Edit Post</Link> */}
					{/* <PostAuthor userId={post.userId} /> */}
					{/* <TimeAgo timestamp={post.date} /> */}
				</p>
				{/* <ReactionBtns post={post} /> */}
			</article>
		</div>
	)
}

export default SinglePostPage
