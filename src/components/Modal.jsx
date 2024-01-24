import { useState } from 'react';
import { createPortal } from 'react-dom';

export default function Modal() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button onClick={() => setShowModal(true)}>
        Show modal using a portal
      </button>
      {showModal && createPortal(
        <div className="modal">
        <div>I'm a modal dialog</div>
        <button onClick={onClose}>Close</button>
      </div>,
        document.body
      )}
    </>
  );
}
