import { render, screen } from '@testing-library/react'
import TodoCard from './TodoCard'

describe('<TodoCard />', () => {
  test('when rendered then show the todo card', () => {
    render(<TodoCard />)
    const todoCard = screen.getByText(/todo list app/i)
    expect(todoCard).toBeInTheDocument()
  })
})
