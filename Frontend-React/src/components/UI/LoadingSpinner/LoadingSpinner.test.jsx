import { render, screen } from '@testing-library/react'
import LoadingSpinner from './LoadingSpinner'

describe('<LoadingSpinner />', () => {
  test('shows loading spinner', () => {
    render(<LoadingSpinner />)
    const spinner = screen.getByRole('button')
    expect(spinner).toBeInTheDocument()
  })

  test('shows spinner message', () => {
    render(<LoadingSpinner message="test message" />)
    const spinner = screen.getByText(/test message/i)
    expect(spinner).toBeInTheDocument()
  })
})
