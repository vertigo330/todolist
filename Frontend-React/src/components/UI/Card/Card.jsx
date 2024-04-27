import { Alert } from 'react-bootstrap'

const Card = ({ heading, type, children }) => {
  return (
    <Alert variant={type}>
      <Alert.Heading>{heading}</Alert.Heading>
      {children}
    </Alert>
  )
}

export default Card
