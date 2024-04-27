import { render, screen } from '@testing-library/react'
import LoadingSpinner from './LoadingSpinner'

describe('<LoadingSpinner />', () => {
  test('when show is true then spinner is rendered to the document', () => {
    render(<LoadingSpinner show={true} message="test message" />)
    const spinner = screen.getByRole('modal')
    expect(spinner).toBeVisible('test message')
  })

  test('when show is false then spinner is not rendered to the document', () => {
    render(<LoadingSpinner show={false} message="test message" />)
    const spinner = screen.queryByRole('modal')
    expect(spinner).toBeFalsy()
  })
})
