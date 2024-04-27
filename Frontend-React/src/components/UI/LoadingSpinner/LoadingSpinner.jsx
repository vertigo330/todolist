import { Modal } from 'react-bootstrap'

const LoadingSpinner = ({ message, show }) => {
  return (
    <Modal size="sm" show={show} aria-labelledby="modal-sizes-title-sm" role="modal">
      <Modal.Header>
        <Modal.Title id="modal-sizes-title-sm">{message}</Modal.Title>
      </Modal.Header>
    </Modal>
  )
}

export default LoadingSpinner
