import React from 'react'
import { useSelector } from 'react-redux'
import PostAuthor from './PostAuthor'
import { selectPostById } from './postsSlice'
import ReactionBtns from './ReactionBtns'
import TimeAgo from './TimeAgo'

const SinglePostPage = () => {
	let postId = '1'
	// retrieve postId
	const post = useSelector(state => selectPostById(state, postId))

	if (!post) {
		return (
			<section>
				<h2>Post not found!</h2>
			</section>
		)
	}

	return (
		<div>
			<article>
				<h2>{post.title}</h2>
				<p>{post.body}</p>
				<p className='postCredit'>
					<PostAuthor />
					<TimeAgo />
				</p>
				Z<ReactionBtns />
			</article>
		</div>
	)
}

export default SinglePostPage
