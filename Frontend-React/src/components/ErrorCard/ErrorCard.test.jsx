import { render, screen } from '@testing-library/react'
import ErrorCard from './ErrorCard'

describe('<ErrorCard />', () => {
  test('when rendered then show the error card', () => {
    render(<ErrorCard message="test error message" />)
    const errorCard = screen.getByRole('alert')
    expect(errorCard).toHaveTextContent('test error message')
  })
})
