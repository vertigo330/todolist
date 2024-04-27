import { render, screen } from '@testing-library/react'
import TodoList from './TodoList'

const items = [
  { id: 1, description: 'test item 1' },
  { id: 2, description: 'test item 2' },
  { id: 3, description: 'test item 3' },
]

describe('<TodoList />', () => {
  test('when rendered then shows the refresh button', () => {
    render(<TodoList />)
    const refresh = screen.getByRole('button')
    expect(refresh).toBeInTheDocument()
  })

  test('when the refresh button is clicked then calls the refresh function', () => {
    const mockHandler = jest.fn()
    render(<TodoList getItems={mockHandler} />)
    const refresh = screen.getByRole('button')
    refresh.click()
    expect(mockHandler).toHaveBeenCalledTimes(1)
  })

  test('when rendered then shows number of items in summary', () => {
    render(<TodoList items={items} />)
    const expectedText = `Showing ${items.length} Item(s)`
    const summary = screen.getByText(expectedText)
    expect(summary).toBeInTheDocument()
  })

  test('when rendered with a single item then table has one header and one row', () => {
    const item = [items[0]]
    render(<TodoList items={item} />)
    const list = screen.getAllByRole('row')
    expect(list).toHaveLength(item.length + 1)
  })

  test('when rendered with multiple items then table has one header and multiple rows', () => {
    render(<TodoList items={items} />)
    const list = screen.getAllByRole('row')
    expect(list).toHaveLength(items.length + 1)
  })

  test('when rendered then displays the Mark as complete buttons', () => {
    render(<TodoList items={items} />)
    const markAsComplete = screen.queryAllByText('Mark as completed', { selector: 'button' })
    expect(markAsComplete).toHaveLength(3)
  })

  test('when the Mark as complete button is clicked then calls the complete function', () => {
    const item = [items[0]]
    const mockHandler = jest.fn()
    render(<TodoList items={item} handleMarkAsComplete={mockHandler} />)
    const markAsComplete = screen.getByText('Mark as completed', { selector: 'button' })
    markAsComplete.click()
    expect(mockHandler).toHaveBeenCalledTimes(1)
  })
})
