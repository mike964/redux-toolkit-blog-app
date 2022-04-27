import { useSelector, useDispatch } from 'react-redux'
import {
	selectAllPosts,
	getPostsStatus,
	getPostsError,
	fetchPosts,
} from './postsSlice'
import { useEffect } from 'react'
import PostsExcerpt from './PostsExcerpt'
import { Link } from 'react-router-dom'

const PostsList = () => {
	// const dispatch = useDispatch()

	const posts = useSelector(state => state.posts)

	// Sort posts in reverse chronological order by datetime string
	const orderedPosts = posts
		.slice()
		.sort((a, b) => b.date.localeCompare(a.date))

	const renderedPosts = orderedPosts.map(post => (
		<article className='post-excerpt' key={post.id}>
			<h3>{post.title}</h3>
			<p className='post-content'>{post.content.substring(0, 100)}</p>
			<Link to={`/posts/${post.id}`} className='button muted-button'>
				View Post
			</Link>
		</article>
	))

	return (
		<section className='posts-list'>
			<h2>Posts</h2>
			{renderedPosts}
		</section>
	)
}

export default PostsList
