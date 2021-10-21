import React, { useState } from 'react'
const Blog = ({ blog, updateLike, removeBlog, user }) => {
  const [fullDetailVisible, setFullDetailVisible] = useState(false)

  const hideWhenVisible = { display: fullDetailVisible ? 'none' : '' }
  const showWhenVisible = { display: fullDetailVisible ? '' : 'none' }

  const addLike = (event) => {
    event.preventDefault()
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    updateLike(updatedBlog)
  }

  const deleteBlog = (event) => {
    event.preventDefault()
    removeBlog(blog)
  }

  const blogStyle = {
    paddingTop: 5,
    paddingBottom: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  return (
    <div style={blogStyle} className="blog">
      <br />
      <div style={hideWhenVisible}>
        {blog.title} {blog.author} &nbsp;
        <button className="view_btn" onClick={() => setFullDetailVisible(true)}>
          view
        </button>
      </div>
      <div style={showWhenVisible}>
        {blog.title}&nbsp;
        <button onClick={() => setFullDetailVisible(false)}>hide</button>
        <br />
        {blog.url}
        <br />
        likes {blog.likes} &nbsp;
        <button onClick={addLike} className="likeBtn">
          like
        </button>
        <br />
        {blog.author}
        <br />
        <div
          style={
            blog.user.username === user.username
              ? showWhenVisible
              : hideWhenVisible
          }
        >
          <button onClick={deleteBlog}>remove</button>
        </div>
      </div>
    </div>
  )
}

export default Blog
