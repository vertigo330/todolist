import classes from './ErrorCard.module.css'
import Card from '../UI/Card/Card'

const ErrorCard = ({ message }) => {
  return (
    <Card heading="Something went wrong!" subHeading=":-(" type="danger">
      {message}
    </Card>
  )
}

export default ErrorCard
