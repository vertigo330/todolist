import { render, screen } from '@testing-library/react'
import ErrorCard from './ErrorCard'

describe('<ErrorCard />', () => {
  test('when rendered then show the error card', () => {
    render(<ErrorCard />)
    const errorCard = screen.getByRole('alert')
    expect(errorCard).toBeInTheDocument()
  })
})
