import { render, screen } from '@testing-library/react'
import Footer from './Footer'

describe('<Footer />', () => {
  test('when rendered then displays the footer text', () => {
    render(<Footer />)
    const footer = screen.getByText(/© 2021 copyright:/i)
    expect(footer).toBeInTheDocument()
  })
})
