import classes from './App.module.css'
import { Container, Row, Col } from 'react-bootstrap'
import React, { useEffect } from 'react'
import TodoCard from './components/TodoCard/TodoCard'
import TodoAdd from './components/TodoAdd/TodoAdd'
import TodoList from './components/TodoList/TodoList'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

const axios = require('axios')

const App = () => {
  useEffect(() => {
    // todo
  }, [])

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
            <TodoAdd />
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <TodoList />
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  )
}

export default App
