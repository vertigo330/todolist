import { render, screen } from '@testing-library/react'
import TodoList from './TodoList'

describe('<TodoList />', () => {
  const items = [
    { id: 1, description: 'test item 1' },
    { id: 2, description: 'test item 2' },
    { id: 3, description: 'test item 3' },
  ]

  test('when rendered then shows the refresh button', () => {
    render(<TodoList />)
    const refresh = screen.getByRole('button')
    expect(refresh).toBeInTheDocument()
    expect(refresh).toHaveTextContent('Refresh')
  })

  test('when the refresh button is clicked then calls the refresh function', () => {
    const mockHandler = jest.fn()
    render(<TodoList getItems={mockHandler} />)
    const refresh = screen.getByRole('button')
    refresh.click()
    expect(mockHandler).toHaveBeenCalledTimes(1)
  })

  test('when rendered then shows number of items summary', () => {
    render(<TodoList items={items} />)
    const expectedText = `Showing ${items.length} Item(s)`
    const summary = screen.getByText(expectedText)
    expect(summary).toBeInTheDocument()
  })

  test('when rendered with a single item then lists one item', () => {
    const item = [items[0]]
    render(<TodoList items={item} />)
    const list = screen.getAllByRole('row')
    expect(list).toHaveLength(2) //to account for the header
  })

  test('when rendered with multiple items then lists multiple items', () => {
    render(<TodoList items={items} />)
    const list = screen.getAllByRole('row')
    expect(list).toHaveLength(4)
  })
})
