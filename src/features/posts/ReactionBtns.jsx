import React from 'react'
import { useDispatch } from 'react-redux'
import { reactionAdded } from './postsSlice'

const reactionEmoji = {
	thumbsUp: '👍',
	wow: '😮',
	heart: '❤️',
	rocket: '🚀',
	coffee: '☕',
	hooray: '🎉',
	eyes: '👀',
}

const ReactionBtns = ({ post }) => {
	const dispatch = useDispatch()

	const reactionBtns = Object.entries(reactionEmoji).map(([name, emoji]) => {
		return (
			<button
				key={name}
				type='button'
				className='reactionButton'
				onClick={() =>
					dispatch(reactionAdded({ postId: post.id, reaction: name }))
				}>
				{emoji} {post.reactions[name]}
			</button>
		)
	})

	return <div>{reactionBtns}</div>
}

export default ReactionBtns
