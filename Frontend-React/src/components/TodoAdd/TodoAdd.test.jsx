import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TodoAdd from './TodoAdd'

describe('<TodoAdd />', () => {
  describe('when description', () => {
    test('then renders the description textbox', () => {
      render(<TodoAdd />)
      const textbox = screen.getByRole('textbox')
      expect(textbox).toBeInTheDocument()
    })

    test('then calls the description changed function', async () => {
      const user = userEvent.setup()
      const mockHandler = jest.fn()
      render(<TodoAdd handleDescriptionChange={mockHandler} />)
      const textbox = screen.getByRole('textbox')
      await user.type(textbox, 'foo')
      expect(textbox.value).toBe('foo')
      expect(mockHandler).toHaveBeenCalledTimes(3)
    })
  })

  describe('when add item button', () => {
    test('then renders the button', () => {
      render(<TodoAdd />)
      const additem = screen.getByRole('additem')
      expect(additem).toBeInTheDocument()
    })

    test('then calls the add item function', () => {
      const mockHandler = jest.fn()
      render(<TodoAdd handleAdd={mockHandler} />)
      const additem = screen.getByRole('additem')
      additem.click()
      expect(mockHandler).toHaveBeenCalledTimes(1)
    })
  })

  describe('when clear', () => {
    test('then renders the clear button', () => {
      render(<TodoAdd />)
      const clear = screen.getByRole('clear')
      expect(clear).toBeInTheDocument()
    })

    test('then calls the clear function', () => {
      const mockHandler = jest.fn()
      render(<TodoAdd handleClear={mockHandler} />)
      const clear = screen.getByRole('clear')
      clear.click()
      expect(mockHandler).toHaveBeenCalledTimes(1)
    })
  })
})
