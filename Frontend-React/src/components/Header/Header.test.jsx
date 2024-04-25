import { render, screen } from '@testing-library/react'
import Header from './Header'

test('renders the logo', () => {
  render(<Header />)
  const footerElement = screen.getByRole('img')
  expect(footerElement).toBeInTheDocument()
})
