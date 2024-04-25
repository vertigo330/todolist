import { render, screen } from '@testing-library/react'
import Footer from './Footer'

test('renders the footer text', () => {
  render(<Footer />)
  const footerElement = screen.getByText(/clearpoint.digital/i)
  expect(footerElement).toBeInTheDocument()
})
