import React from 'react'
import PostsList from './features/posts/PostsList'
import AddPostForm from './features/posts/AddPostForm'
// import Layout from './components/Layout'
import SinglePostPage from './features/posts/SinglePostPage'
import EditPostForm from './features/posts/EditPostForm'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'

function App() {
	return (
		<>
			<Header />
			<main className='app'>
				<Routes>
					<Route path='/'>
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
			</main>
		</>
	)
}

export default App
