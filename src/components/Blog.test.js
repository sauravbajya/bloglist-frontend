import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, getByDisplayValue } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('<Blog />', () => {
  const user = {
    name: 'saurav',
    username: 'saurav',
  }
  const blog = {
    author: 'testauthor',
    title: 'testtitle',
    url: 'testurl',
    user: {
      username: 'saurav',
    },
    likes: 500,
  }
  let mockHandler
  let component
  beforeEach(() => {
    mockHandler = jest.fn()
    component = render(
      <Blog blog={blog} user={blog} updateLike={mockHandler} />
    )
    // component.debug()
  })

  test('renders content', () => {
    expect(component.container).toHaveTextContent('testtitle')
  })

  test('renders only title and author by default', () => {
    const hideWhenVisibleDiv =
      component.container.querySelector('div:nth-child(2)')
    expect(hideWhenVisibleDiv).toHaveTextContent('testtitle testauthor')
    expect(hideWhenVisibleDiv).not.toHaveTextContent('testurl 500 likes')
  })

  test('renders other when show button is clicked', () => {
    const viewButton = component.container.querySelector(
      'div:nth-child(2) button'
    )
    fireEvent.click(viewButton)
    const hideWhenVisibleDiv =
      component.container.querySelector('div:nth-child(2)')
    expect(hideWhenVisibleDiv).toHaveStyle('display: none')
    const showWhenVisibleDiv =
      component.container.querySelector('div:nth-child(3)')
    expect(showWhenVisibleDiv).not.toHaveStyle('display: none')
  })

  test('like button clicked twice will call prop twice', () => {
    const likeButton = component.container.querySelector(
      'div:nth-child(3) .likeBtn'
    )
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
