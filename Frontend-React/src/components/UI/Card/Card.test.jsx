import { render, screen } from '@testing-library/react'
import Card from './Card'

describe('<Card />', () => {
  test('when rendered then shows heading section', () => {
    render(<Card heading="test heading" />)
    const card = screen.getByText(/test heading/i)
    expect(card).toBeInTheDocument()
  })

  test('when rendered then shows children', () => {
    render(<Card>test children</Card>)
    const card = screen.getByText(/test children/i)
    expect(card).toBeInTheDocument()
  })
})
