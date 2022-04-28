import { useSelector, useDispatch } from 'react-redux'
import {
	selectAllPosts,
	getPostsStatus,
	getPostsError,
	fetchPosts,
} from './postsSlice'
import { useEffect } from 'react'
import PostExcerpt from './PostExcerpt'
import { Link } from 'react-router-dom'
import Spinner from '../../components/Spinner'

const PostsList = () => {
	const dispatch = useDispatch()

	// const posts = useSelector(state => state.posts)
	const posts = useSelector(selectAllPosts)

	const postStatus = useSelector(state => state.posts.status)
	const error = useSelector(state => state.posts.error)

	useEffect(() => {
		// prevent fetching the posts several times
		if (postStatus === 'idle') {
			dispatch(fetchPosts())
		}
	}, [postStatus, dispatch])

	// Sort posts in reverse chronological order by datetime string
	// const orderedPosts = posts
	// 	.slice()
	// 	.sort((a, b) => b.date.localeCompare(a.date))

	// const content = orderedPosts.map(post => (
	// 	<article className='post-excerpt' key={post.id}>
	// 		<h3>{post.title}</h3>
	// 		<p className='post-content'>{post.content.substring(0, 100)}</p>
	// 		<Link to={`/posts/${post.id}`} className='button muted-button'>
	// 			View Post
	// 		</Link>
	// 	</article>
	// ))

	let content
	if (postStatus === 'loading') {
		content = <Spinner text='Loading...' />
	} else if (postStatus === 'succeeded') {
		// Sort posts in reverse chronological order by datetime string
		const orderedPosts = posts
			.slice()
			.sort((a, b) => b.date.localeCompare(a.date))

		content = orderedPosts.map(post => (
			<PostExcerpt key={post.id} post={post} />
		))
	} else if (postStatus === 'failed') {
		content = <div>{error}</div>
	}

	return (
		<section className='posts-list'>
			<h2>Posts</h2>
			{content}
		</section>
	)
}

export default PostsList
