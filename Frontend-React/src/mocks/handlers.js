import { rest } from 'msw'

export const handlers = [
  rest.get('https://localhost:5001/api/todoitems', (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: '3a139dc5-412f-4929-b4e5-a018e007b7a8',
          description: 'Brush my teeth',
          isComplete: false,
        },
      ])
    )
  }),
]
