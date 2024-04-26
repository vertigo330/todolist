import { render, screen } from '@testing-library/react'
import ErrorCard from './ErrorCard'

describe('<ErrorCard />', () => {
  test('show the error card', () => {
    render(<ErrorCard />)
    const todoCard = screen.getByText(/something went wrong!/i)
    expect(todoCard).toBeInTheDocument()
  })
})
