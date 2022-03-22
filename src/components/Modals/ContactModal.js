import ReactDOM from 'react-dom';
import CloseIcon from '@mui/icons-material/Close';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import './ContactModal.css';

function ContactModal({ setOpen }) {
  return ReactDOM.createPortal(
    <>
      <div className="contact-wrapper">
        <div className="contact-form">
          <button className="close-button" onClick={() => setOpen(false)}>
            <CloseIcon></CloseIcon>
          </button>
          <h1>Contact Us!</h1>
          <input placeholder="Name" required></input>
          <input placeholder="Email" required></input>
          <textarea
            placeholder="Message"
            rows="10"
            cols="30"
            required
          ></textarea>
          <button className="submit-button">Submit</button>
          <section>
            <InstagramIcon />
            <FacebookIcon />
            <TwitterIcon />
          </section>
        </div>
      </div>
    </>,
    document.getElementById('modal-portal')
  );
}

export default ContactModal;
