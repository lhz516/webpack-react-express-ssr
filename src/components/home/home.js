import { increment } from '@slices/global'
import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useDispatch, useSelector } from 'react-redux'
import { useGetAllTodosQuery } from '@services/todos'
import './home.scss'

const Home = () => {
  const dispatch = useDispatch()
  const foo = useSelector((state) => state.global.foo)
  const handleAddFoo = () => {
    dispatch(increment())
  }

  const { data } = useGetAllTodosQuery()

  return (
    <div className="home">
      <Helmet>
        <title>Home page title</title>
      </Helmet>
      <img src="/static/example.jpg" alt="Example" />
      <p>
        foo: <span className="home__foo">{foo}</span>
      </p>
      <button className="home__add-foo" onClick={handleAddFoo}>
        Add foo
      </button>
      {/* There is no fetching state because the data is already in the html. */}
      <p className="home__ssr">Dynamic SSR example: {data?.[0].text}</p>
    </div>
  )
}

export default Home
