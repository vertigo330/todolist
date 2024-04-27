import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { server } from './mocks/server'
import App from './App'

describe('<App />', () => {
  describe('when rendered', () => {
    test('then the todo list is asynchronously populated with rows', async () => {
      render(<App />)
      await waitFor(() => {
        const list = screen.getAllByRole('row')
        expect(list).toHaveLength(2)
      })
    })

    test('and an error occures then an error message is displayed', async () => {
      //Override the mws hander here to return an error response
      server.resetHandlers(
        rest.get('https://localhost:5001/api/todoitems', (req, res, ctx) => {
          return res(null, { status: 500 })
        })
      )
      render(<App />)
      const errorCard = await screen.findByRole('alert')
      expect(errorCard).toBeVisible()
    })

    test('and Mark as Complete button is clicked then shows the spinner', async () => {
      render(<App />)
      const markAsComplete = await screen.findByText('Mark as completed', { selector: 'button' })
      const user = userEvent.setup()
      user.click(markAsComplete)
      const spinner = await screen.findByText('Working on it...')
      expect(spinner).toBeVisible()
    })

    describe('and an item description is entered', () => {
      test('and the Add button is clicked then shows the spinner', async () => {
        const user = userEvent.setup()
        render(<App />)
        const textbox = screen.getAllByPlaceholderText('Enter description...', { selector: 'input' })
        user.type(textbox, 'foo')

        const additem = screen.getByRole('additem')
        additem.click()
        const spinner = await screen.findByText('Working on it...')
        expect(spinner).toBeVisible()
      })

      test('and the Clear button is clicked then clears the description', async () => {
        const user = userEvent.setup()
        render(<App />)
        const textbox = screen.getByPlaceholderText('Enter description...', { selector: 'input' })
        user.type(textbox, 'foo')
        const clear = screen.getByRole('clear')
        clear.click()
        expect(textbox).toHaveValue('')
      })
    })
  })
})
