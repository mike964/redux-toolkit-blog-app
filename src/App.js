import React from 'react'
import PostsList from './features/posts/PostsList'
import AddPostForm from './features/posts/AddPostForm'
import Layout from './components/Layout'
import SinglePostPage from './features/posts/SinglePostPage'
import EditPostForm from './features/posts/EditPostForm'
import { Route, Routes } from 'react-router-dom'

function App() {
	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route
					index
					element={
						<React.Fragment>
							<AddPostForm />
							<PostsList />
						</React.Fragment>
					}
				/>

				<Route path='posts'>
					<Route index element={<AddPostForm />} />
					<Route path=':postId' element={<SinglePostPage />} />
					<Route path='edit/:postId' element={<EditPostForm />} />
				</Route>
			</Route>
		</Routes>
	)
}

export default App
