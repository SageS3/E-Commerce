import React from 'react';
import ReactDOM from 'react-dom';
import './PreviewModal.css';
import CloseIcon from '@mui/icons-material/Close';

export default function PreviewModal({ products, setOpen }) {
  return ReactDOM.createPortal(
    <div className="modal-wrapper">
      <button onClick={() => setOpen(false)}>
        <CloseIcon></CloseIcon>
      </button>
      <div className="preview-wrapper">
        <div className="img"></div>
        <section>
          <header>
            <h3>Item</h3>
            <h3>Price</h3>
          </header>
          <h4>Description</h4>
        </section>
      </div>
    </div>,
    document.getElementById('modal-portal')
  );
}
