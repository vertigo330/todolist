import { render, screen } from '@testing-library/react'
import Card from './Card'

describe('<Card />', () => {
  test('when rendered then shows heading section', () => {
    render(<Card heading="test heading" />)
    const card = screen.getByText(/test heading/i)
    expect(card).toBeInTheDocument()
  })

  test('when rendered then shows sub-heading section', () => {
    render(<Card subHeading="test sub-heading" />)
    const card = screen.getByText(/test sub-heading/i)
    expect(card).toBeInTheDocument()
  })
})
