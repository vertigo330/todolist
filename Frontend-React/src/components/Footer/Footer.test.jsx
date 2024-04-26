import { render, screen } from '@testing-library/react'
import Footer from './Footer'

describe('<Footer />', () => {
  test('when rendered then displays the footer text', () => {
    render(<Footer />)
    const footerElement = screen.getByText(/clearpoint.digital/i)
    expect(footerElement).toBeInTheDocument()
  })
})
