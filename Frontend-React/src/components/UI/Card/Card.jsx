import { Alert } from 'react-bootstrap'

const Card = ({ heading, subHeading, type, children }) => {
  return (
    <Alert variant={type}>
      <Alert.Heading>{heading}</Alert.Heading>
      {subHeading}
      <br />
      <br />
      {children}
    </Alert>
  )
}

export default Card
