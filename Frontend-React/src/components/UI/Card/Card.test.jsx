import { render, screen } from '@testing-library/react'
import Card from './Card'

describe('<Card />', () => {
  test('shows heading', () => {
    render(<Card heading="test heading" />)
    const card = screen.getByText(/test heading/i)
    expect(card).toBeInTheDocument()
  })

  test('shows sub-heading', () => {
    render(<Card subHeading="test sub-heading" />)
    const card = screen.getByText(/test sub-heading/i)
    expect(card).toBeInTheDocument()
  })
})
