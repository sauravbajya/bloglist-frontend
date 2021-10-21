import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  if (message.type === 'success') {
    return <div className="success">{message.message}</div>
  } else if (message.type === 'error') {
    return <div className="error">{message.message}</div>
  } else if (message.type === 'warning') {
    return <div className="warning">{message.message}</div>
  } else {
    return null
  }
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage({
        message: `wrong username or password`,
        type: 'error',
      })
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const addBlog = (BlogObject) => {
    blogFormRef.current.toggleVisibility()

    blogService.create(BlogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog))
      setErrorMessage({
        message: `a new blog ${BlogObject.title} by ${BlogObject.author} was added`,
        type: 'success',
      })
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    })
  }

  const addLike = (BlogObject) => {
    blogService.update(BlogObject.id, BlogObject).then((returnedBlog) => {
      setBlogs(
        blogs.map((blog) => (blog.id !== BlogObject.id ? blog : returnedBlog))
      )
    })
  }

  const deleteBlog = (BlogObject) => {
    if (
      window.confirm(`Remove blog ${BlogObject.title} by ${BlogObject.author}?`)
    ) {
      blogService.remove(BlogObject.id)
      const updatedBlog = blogs.filter((b) => b.id !== BlogObject.id)
      setBlogs(updatedBlog)
    }
  }

  if (user === null) {
    return (
      <form onSubmit={handleLogin}>
        <h2>Login Blogs</h2>
        <Notification message={errorMessage} />
        <div>
          username:{' '}
          <input
            type="text"
            value={username}
            name="Username"
            id="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password:
          <input
            type="password"
            value={password}
            name="Password"
            id="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">
          Login
        </button>
      </form>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} />
      <p>
        {user.name} logged-in{' '}
        <button
          onClick={() => {
            setUser(null) // This ensures that the user state is null
            setUsername('')
            setPassword('')
            window.localStorage.clear()
          }}
        >
          logout
        </button>
      </p>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateLike={addLike}
            removeBlog={deleteBlog}
            user={user}
          />
        ))}
    </div>
  )
}

export default App
