import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import classes from './App.module.css'
import TodoCard from './components/TodoCard/TodoCard'
import TodoAdd from './components/TodoAdd/TodoAdd'
import TodoList from './components/TodoList/TodoList'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

const axios = require('axios')

const App = () => {
  const [items, setItems] = useState()
  const [description, setDescription] = useState('')

  useEffect(() => {
    // todo
  }, [])

  async function getItems() {
    try {
      alert('todo')
    } catch (error) {
      console.error(error)
    }
  }

  async function handleMarkAsComplete(item) {
    try {
      alert('todo')
    } catch (error) {
      console.error(error)
    }
  }

  async function handleAdd() {
    try {
      alert('todo')
    } catch (error) {
      console.error(error)
    }
  }

  function handleClear() {
    setDescription('')
  }

  const handleDescriptionChange = (event) => {
    // todo
  }

  return (
    <div className={classes.App}>
      <Container>
        <Row>
          <Col>
            <Header />
          </Col>
        </Row>
        <Row>
          <Col>
            <TodoCard />
          </Col>
        </Row>
        <Row>
          <Col>
            <TodoAdd
              handleAdd={handleAdd}
              handleClear={handleClear}
              handleDescriptionChange={handleDescriptionChange}
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <TodoList items={items} getItems={getItems} handleMarkAsComplete={handleMarkAsComplete} />
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  )
}

export default App
