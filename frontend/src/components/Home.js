import React from 'react'
import Header from './Header'
import MCCHomeCards from './MCCHomeCards'
import TodoList from './Tasks/TodoList'

const Home = () => {
  return (
    <div>
        <Header />
        <TodoList/>
    </div>
  )
}

export default Home