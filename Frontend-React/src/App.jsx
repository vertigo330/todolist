import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import classes from './App.module.css'
import TodoCard from './components/TodoCard/TodoCard'
import ErrorCard from './components/ErrorCard/ErrorCard'
import TodoAdd from './components/TodoAdd/TodoAdd'
import TodoList from './components/TodoList/TodoList'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import LoadingSpinner from './components/UI/LoadingSpinner/LoadingSpinner'

const App = () => {
  const [items, setItems] = useState([])
  const [description, setDescription] = useState('')
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getItems()
  }, [])

  const getItems = async () => {
    const getItemsCallback = async () => {
      var response = await fetch('https://localhost:5001/api/todoitems')

      if (!response.ok) {
        const errorMessage = await response.text()
        throw new Error(`An error occured while loading your todo list. Error detail: ${errorMessage}`)
      }
      const items = await response.json()
      setItems(items)
    }
    runApiCall(getItemsCallback)
  }

  const handleMarkAsComplete = async (item) => {
    const updateItemCallback = async () => {
      var response = await fetch(`https://localhost:5001/api/todoitems/${item.id}`, {
        method: 'PUT',
        body: JSON.stringify({ ...item, IsCompleted: true }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        const errorMessage = await response.text()
        throw new Error(`An error occured while updating your todo list. Error detail: ${errorMessage}`)
      }
    }
    runApiCall(updateItemCallback)
  }

  const handleAdd = async () => {
    const addItemCallback = async () => {
      var response = await fetch('https://localhost:5001/api/todoitems', {
        method: 'POST',
        body: JSON.stringify({ Description: description }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        const errorMessage = await response.text()
        throw new Error(`An error occured while adding todo. Error detail: ${errorMessage}`)
      }
      setDescription('')
    }

    runApiCall(addItemCallback)
  }

  const handleClear = () => {
    setDescription('')
  }

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value)
  }

  const runApiCall = async (callback) => {
    setError()
    setLoading(true)

    try {
      await callback()
    } catch (ex) {
      setError({ message: ex.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={classes.App}>
      <LoadingSpinner show={loading} message="Working on it..." />
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
          <Col>{error && <ErrorCard message={error.message} />}</Col>
        </Row>
        <Row>
          <Col>
            <TodoAdd
              handleAdd={handleAdd}
              handleClear={handleClear}
              handleDescriptionChange={handleDescriptionChange}
              description={description}
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
