import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TodoAdd from './TodoAdd'

describe('<TodoAdd />', () => {
  test('when rendered then displays the description textbox', () => {
    render(<TodoAdd />)
    const textbox = screen.getByRole('textbox')
    expect(textbox).toBeInTheDocument()
  })

  test('when description entered then calls the description changed function', async () => {
    const user = userEvent.setup()
    const mockHandler = jest.fn()
    render(<TodoAdd handleDescriptionChange={mockHandler} />)
    const textbox = screen.getByRole('textbox')
    await user.type(textbox, 'foo')
    expect(textbox.value).toBe('foo')
    expect(mockHandler).toHaveBeenCalledTimes(3)
  })

  test('when rendered then shows the Add Item button', () => {
    render(<TodoAdd />)
    const additem = screen.getByRole('additem')
    expect(additem).toBeInTheDocument()
  })

  test('when Add Item button clicked then calls the add item function', () => {
    const mockHandler = jest.fn()
    render(<TodoAdd handleAdd={mockHandler} />)
    const additem = screen.getByRole('additem')
    additem.click()
    expect(mockHandler).toHaveBeenCalledTimes(1)
  })

  test('when rendered then shows the Clear button', () => {
    render(<TodoAdd />)
    const clear = screen.getByRole('clear')
    expect(clear).toBeInTheDocument()
  })

  test('when Clear button is clicked then calls the clear function', () => {
    const mockHandler = jest.fn()
    render(<TodoAdd handleClear={mockHandler} />)
    const clear = screen.getByRole('clear')
    clear.click()
    expect(mockHandler).toHaveBeenCalledTimes(1)
  })
})
