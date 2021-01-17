import React from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import './home.scss'

const Home = () => {
  const dispatch = useDispatch()
  const foo = useSelector((state) => state.global.foo)
  const handleAddFoo = () => {
    dispatch({ type: 'ADD_FOO' })
  }
  return (
    <div className="home">
      <Helmet>
        <title>Home page title</title>
      </Helmet>
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
