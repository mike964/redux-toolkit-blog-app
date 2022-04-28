import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import { sub } from 'date-fns'
import axios from 'axios'

// const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'
const POSTS_URL = 'api/posts'

const initialState = {
	posts: [],
	status: 'idle',
	error: null,
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
	const response = await axios.get(POSTS_URL)
	// console.log(axios.defaults)
	return await response.data
})

/* Hint ------------------
createAsyncThunk accepts two arguments: 
A string that will be used as the prefix for the generated action types
A "payload creator" callback function that should return 
a Promise containing some data, or a rejected Promise with an error
*/

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

/* Action Sample ------------
{
  type: 'posts/postUpdated',
  payload: {
    id: '123',
    title: 'First Post',
    content: 'Some text here'
  }
}
*/

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		postAdded: {
			// * action.type : posts/postAdded
			reducer(state, action) {
				state.posts.push(action.payload)
				// state.push(action.payload)  // before async
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
			const existingPost = state.posts.find(post => post.id === postId)
			if (existingPost) {
				existingPost.reactions[reaction]++
			}
		},
		postUpdated(state, action) {
			const { id, title, content } = action.payload
			const existingPost = state.posts.find(post => post.id === id)
			if (existingPost) {
				existingPost.title = title
				existingPost.content = content
			}
		},
	},
	extraReducers(builder) {
		builder
			.addCase(fetchPosts.pending, (state, action) => {
				state.status = 'loading'
			})
			.addCase(fetchPosts.fulfilled, (state, action) => {
				state.status = 'succeeded'
				// Add any fetched posts to the array
				state.posts = state.posts.concat(action.payload)
			})
			.addCase(fetchPosts.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message
			})
	},
})

// export const selectAllPosts = state => state.posts.posts
// export const getPostsStatus = state => state.posts.status
// export const getPostsError = state => state.posts.error

/*
- Use selector functions in order not to import useSlelector in all components 
  to access store state
*/
export const selectAllPosts = state => {
	// return state.posts
	return state.posts.posts // after async
}

export const selectPostById = (state, postId) => {
	// return state.posts.find(post => post.id === postId)
	return state.posts.posts.find(post => post.id === postId)
}

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

export default postsSlice.reducer

/*
- Don't try to mutate any data outside of createSlice!
- prepare customize the contents of action.payload
- when a slice reducer needs to respond to other actions that 
  weren't defined as part of this slice's reducers field,
  We do that using the slice 'extraReducers' field 
*/

/* 
  The 'extraReducers' option should be a function that receives 
  a parameter called builder. The builder object provides methods that 
  let us define additional case reducers that will run in response to 
  actions defined outside of the slice. 
  We'll use builder.addCase(actionCreator, reducer) to handle each of
  the actions dispatched by our async thunks.
*/
