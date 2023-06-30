import React from 'react';
import './Contact.css';

function Contact() {
  return (
    <>
    <div className="contact">
        <main>
            <div className="oneone"><h1>Contact Us</h1></div>
            <form >
                <div>
                    <label >Name</label>
                    <input type="text" required placeholder='abc'/>
                </div>
                <div>
                    <label >Email</label>
                    <input type="email" required placeholder='abc@xyz.com'/>
                </div>
                <div>
                    <label >Message</label>
                    <input type="text" required placeholder='Tell us about your queries..'/>
                </div>

                <button type="submit">Submit</button>
            </form>
        </main>
    </div>
    </>
  )
}

export default Contact;