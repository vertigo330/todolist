import { Button, Alert, Spinner } from 'react-bootstrap'

const LoadingSpinner = ({ message }) => {
  return (
    <Button variant="primary" disabled>
      <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
      {message}
    </Button>
  )
}

export default LoadingSpinner
