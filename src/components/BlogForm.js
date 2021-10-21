import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  })

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
    })

    setNewBlog({
      title: '',
      author: '',
      url: '',
    })
  }

  return (
    <div className="formDiv">
      <h2>Create a new Blog</h2>

      <form onSubmit={addBlog}>
        <div>
          title:{' '}
          <input
            id="title"
            type="text"
            value={newBlog.title}
            name="Title"
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, title: target.value })
            }
          />
        </div>
        <div>
          author:{' '}
          <input
            id="author"
            type="text"
            value={newBlog.author}
            name="Author"
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, author: target.value })
            }
          />
        </div>
        <div>
          url:{' '}
          <input
            id="url"
            type="text"
            value={newBlog.url}
            name="Title"
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, url: target.value })
            }
          />
        </div>
        <button id="create" type="submit">
          create
        </button>
      </form>
    </div>
  )
}

export default BlogForm
