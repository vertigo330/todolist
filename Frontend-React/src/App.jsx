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
        throw new Error('Error calling the get endpoint')
      }
      const items = await response.json()
      setItems(items)
    }
    runApiCall(getItemsCallback, 'An error occured while loading your todo list.')
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
        throw new Error('Error calling the put endpoint')
      }
    }
    runApiCall(updateItemCallback, 'An error occured while updating your todo list.')
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
        throw new Error('Error calling the post endpoint')
      }
      setDescription('')
    }

    runApiCall(addItemCallback, 'An error occured while adding todo.')
  }

  const handleClear = () => {
    setDescription('')
  }

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value)
  }

  const runApiCall = async (callback, errorMessage) => {
    setError()
    setLoading(true)

    try {
      await callback()
    } catch (ex) {
      setError({ message: errorMessage })
    } finally {
      setLoading(false)
    }
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
            {error && <ErrorCard message={error.message} />}
            <TodoCard />
          </Col>
        </Row>
        <Row>
          <Col>
            <TodoAdd
              handleAdd={handleAdd}
              handleClear={handleClear}
              handleDescriptionChange={handleDescriptionChange}
              description={description}
            />
            {loading && <LoadingSpinner message="Working on it..." />}
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
