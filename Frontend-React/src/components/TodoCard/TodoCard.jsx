import classes from './TodoCard.module.css'
import Card from '../UI/Card/Card'

const TodoCard = () => {
  return (
    <Card
      heading="Todo List App"
      subHeading="Welcome to the Todo List application. Features include:"
      type="success"
    >
      <ol className={classes['list-left']}>
        <li>Add the ability to add (POST) a Todo Item by calling the backend API</li>
        <li>Display (GET) all the current Todo Items in the below grid and display them in any order you wish</li>
        <li>'Mark as completed' button code for allowing users to update and mark a specific Todo Item as completed and for displaying any relevant validation errors/ messages from the API in
          the UI
        </li>
        <li>Unit tests</li>
      </ol>
    </Card>
  )
}

export default TodoCard
