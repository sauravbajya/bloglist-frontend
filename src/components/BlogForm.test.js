import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  const component = render(<BlogForm createBlog={createBlog} />)

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'testchangetitle' },
  })
  fireEvent.change(author, {
    target: { value: 'testchangeauthor' },
  })
  fireEvent.change(url, {
    target: { value: 'testchangeurl' },
  })

  fireEvent.submit(form)

  console.log(createBlog.mock.calls[0][0])
  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toMatchObject({
    title: 'testchangetitle',
    author: 'testchangeauthor',
    url: 'testchangeurl',
  })
})
