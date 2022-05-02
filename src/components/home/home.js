import { increment } from '@slices/global'
import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useDispatch, useSelector } from 'react-redux'
import './home.scss'

const Home = () => {
  const dispatch = useDispatch()
  const foo = useSelector((state) => state.global.foo)
  const handleAddFoo = () => {
    dispatch(increment())
  }
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
    </div>
  )
}

export default Home
