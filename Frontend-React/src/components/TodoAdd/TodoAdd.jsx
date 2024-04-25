import React, { useState } from 'react'
import { Button, Container, Row, Col, Form, Stack } from 'react-bootstrap'

const TodoAdd = ({ handleAdd, handleClear, handleDescriptionChange, description }) => {
  return (
    <Container>
      <h1>Add Item</h1>
      <Form.Group as={Row} className="mb-3" controlId="formAddTodoItem">
        <Form.Label column sm="2">
          Description
        </Form.Label>
        <Col md="6">
          <Form.Control
            type="text"
            placeholder="Enter description..."
            value={description}
            onChange={handleDescriptionChange}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3 offset-md-2" controlId="formAddTodoItem">
        <Stack direction="horizontal" gap={2}>
          <Button variant="primary" onClick={() => handleAdd()} role="additem">
            Add Item
          </Button>
          <Button variant="secondary" onClick={() => handleClear()} role="clear">
            Clear
          </Button>
        </Stack>
      </Form.Group>
    </Container>
  )
}

export default TodoAdd
