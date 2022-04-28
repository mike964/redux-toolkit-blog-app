import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionBtns from './ReactionBtns'
import { Link } from 'react-router-dom'

const PostExcerpt = ({ post }) => {
	return (
		<article className='post-excerpt' key={post.id}>
			<h3>{post.title}</h3>
			<div>
				<PostAuthor userId={post.user} />
				<TimeAgo timestamp={post.date} />
			</div>
			<p className='post-content'>{post.content.substring(0, 100)}</p>

			<ReactionBtns post={post} />
			<Link to={`/posts/${post.id}`} className='button muted-button'>
				View Post
			</Link>
		</article>
	)
}
export default PostExcerpt
