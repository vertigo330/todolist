import Card from '../UI/Card/Card'

const ErrorCard = ({ message }) => {
  return (
    <Card heading="Something went wrong :-(" type="danger">
      {message}
    </Card>
  )
}

export default ErrorCard
