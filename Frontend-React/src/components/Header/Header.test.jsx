import { render, screen } from '@testing-library/react'
import Header from './Header'

describe('<Header />', () => {
  test('when rendered then show the logo', () => {
    render(<Header />)
    const logo = screen.getByRole('img')
    expect(logo).toBeInTheDocument()
  })
})
