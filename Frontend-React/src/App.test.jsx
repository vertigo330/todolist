import { render, screen } from '@testing-library/react'
import App from './App'

describe('<App />', () => {
  beforeEach(() => {
    render(<App />)
  })
  describe('when an item description is entered', () => {
    test('and the Add button is clicked then POSTs to the api', () => {})

    test('and the Clear button is clicked then clears the text', () => {})
  })
  test('when the Refresh button is clicked then GETs from the api', () => {})

  test('when the Complete button is clicked then PUTs to the api', () => {})
})
