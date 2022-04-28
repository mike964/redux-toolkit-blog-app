import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import { sub } from 'date-fns'
import axios from 'axios'

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'

const initialState = [
	{
		id: '1',
		title: 'First Post!',
		content: 'Hello!',
		user: '0',
		date: sub(new Date(), { minutes: 10 }).toISOString(),
		reactions: {
			thumbsUp: 0,
			hooray: 0,
			heart: 0,
			rocket: 0,
			eyes: 0,
			wow: 0,
			coffee: 0,
		},
	},
	{
		id: '2',
		title: 'Second Post',
		content: 'More text',
		user: '2',
		date: sub(new Date(), { minutes: 5 }).toISOString(),
		reactions: {
			thumbsUp: 0,
			hooray: 0,
			heart: 0,
			rocket: 0,
			eyes: 0,
			wow: 0,
			coffee: 0,
		},
	},
]

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
	const response = await axios.get(POSTS_URL)
	return response.data
})

export const addNewPost = createAsyncThunk(
	'posts/addNewPost',
	async initialPost => {
		const response = await axios.post(POSTS_URL, initialPost)
		return response.data
	}
)

export const updatePost = createAsyncThunk(
	'posts/updatePost',
	async initialPost => {
		const { id } = initialPost
		try {
			const response = await axios.put(`${POSTS_URL}/${id}`, initialPost)
			return response.data
		} catch (err) {
			//return err.message;
			return initialPost // only for testing Redux!
		}
	}
)

export const deletePost = createAsyncThunk(
	'posts/deletePost',
	async initialPost => {
		const { id } = initialPost
		try {
			const response = await axios.delete(`${POSTS_URL}/${id}`)
			if (response?.status === 200) return initialPost
			return `${response?.status}: ${response?.statusText}`
		} catch (err) {
			return err.message
		}
	}
)

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		postAdded: {
			// * action.type : posts/postAdded
			reducer(state, action) {
				// state.posts.push(action.payload)
				state.push(action.payload)
			},
			prepare(title, content, userId) {
				return {
					payload: {
						id: nanoid(),
						date: new Date().toISOString(),
						title,
						content,
						user: userId,
						reactions: {
							thumbsUp: 0,
							hooray: 0,
							heart: 0,
							rocket: 0,
							eyes: 0,
							wow: 0,
							coffee: 0,
						},
					},
				}
			},
		},
		reactionAdded(state, action) {
			const { postId, reaction } = action.payload
			const existingPost = state.find(post => post.id === postId)
			if (existingPost) {
				existingPost.reactions[reaction]++
			}
		},
		postUpdated(state, action) {
			const { id, title, content } = action.payload
			const existingPost = state.find(post => post.id === id)
			if (existingPost) {
				existingPost.title = title
				existingPost.content = content
			}
		},
	},
})

// export const selectAllPosts = state => state.posts.posts
// export const getPostsStatus = state => state.posts.status
// export const getPostsError = state => state.posts.error

/*
- Use selector functions in order not to import useSlelector in all components 
  to access store state
*/
export const selectAllPosts = state => state.posts

export const selectPostById = (state, postId) =>
	state.posts.find(post => post.id === postId)

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

export default postsSlice.reducer

/*
- Don't try to mutate any data outside of createSlice!
- prepare customize the contents of action.payload
*/
