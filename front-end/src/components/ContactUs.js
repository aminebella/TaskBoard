import React from 'react';
import { IonIcon } from '@ionic/react';
import { person, mail, documentText } from 'ionicons/icons';

export default function ContactUs() {
  return (
    <div className="wrapper">
      <div className="form-box opinion">
        <h2>Get in Touch</h2>
        <h4>Share your opinions with us! Your feedback is invaluable and helps us improve.</h4>
        <form action="#">
          <div className="input-box">
            <span className="icon"><IonIcon icon={person} /></span>
            <input type="text" id="name" required />
            <label htmlFor="name">Username</label>
          </div>
          <div className="input-box">
            <span className="icon"><IonIcon icon={mail} /></span>
            <input type="email" id="email" required />
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-box">
            <span className="icon"><IonIcon icon={documentText} /></span>
            <input type="text" id="text" required />
            <label htmlFor="text">Opinion or Question</label>
            {/* <textarea id="text" required />
            <label htmlFor="text">Opinion or Question</label> */}
          </div>
          <div className="ask-permission">
            <label htmlFor="share_op"><input type="checkbox" id="share_op"/>Do you want to share your opinion with other users</label>
          </div>
          <button type="submit" className="btn_send">Send</button>
        </form>
      </div>
    </div>
  );
}


// <div className="container">
        //   <h1>Contact Us</h1>
        //   <form>
        //     <div className="mb-3">
        //       <label htmlFor="name" className="form-label">
        //         Name:
        //       </label>
        //       <input type="text" className="form-control" id="name" required />
        //     </div>
        //     <div className="mb-3">
        //       <label htmlFor="email" className="form-label">
        //         Email:
        //       </label>
        //       <input type="email" className="form-control" id="email" required />
        //     </div>
        //     <div className="mb-3">
        //       <label htmlFor="message" className="form-label">
        //         Message:
        //       </label>
        //       <textarea className="form-control" id="message" rows="5" required></textarea>
        //     </div>
        //     <button type="submit" className="btn btn-primary">Submit</button>
        //   </form>
        // </div>