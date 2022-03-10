export function Modal(props) {
  function close(event) {
    event.preventDefault();
    if (event.target.classList.contains("modal")) {
      props.close();
    }
  }

  return (
    <div className="modal active" onMouseDown={close}>
      <div className="modal__inner">
        {props.children}
      </div>
    </div>
  )
}

export function ModalHeader(props) {
  return (
    <header className="modal__header">
      {props.children}
    </header>
  )
}

export function ModalContent(props) {
  return (
    <div className="modal__content">
      {props.children}
    </div>
  )
}

export function ModalFooter(props) {
  return (
    <footer className="modal__footer">
      {props.children}
    </footer>
  )
}

export default {Modal, ModalHeader, ModalContent, ModalFooter}
