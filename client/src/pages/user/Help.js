import React from 'react';
import { UserHeader } from '../../componets/userComponent/userHeader';

function Help() {
  const socialMediaLinks = {
    facebook: 'https://www.facebook.com/',
    twitter: 'https://twitter.com/',
    linkedin: 'https://www.linkedin.com/',
    instagram: 'https://www.instagram.com/',
  };
  return (
    <div>
      <UserHeader />

      <div className="bg-gradient-to-r text-black p-6 md:p-12">

        <div >


          <h1 className="text-2xl md:text-4xl font-bold mb-4">Get in Touch</h1>
          <p>
            Have questions, suggestions, or just want to say hi?
            We're here to listen.
          </p>

          <h2 className="text-xl md:text-2xl font-semibold my-4">Contact Information</h2>
          <ul>
            <li>Email: webwork@webwork.com</li>
            <li>Phone: +1 (123) 456-7890</li>
            <li>Address: Kinfra calicut , India</li>
          </ul>

          <h2 className="text-xl md:text-2xl font-semibold my-4">Support Hours</h2>
          <p>
            Our dedicated support team is available to assist you during the following hours:
          </p>
          <ul>
            <li>Monday to Friday: 9:00 AM - 6:00 PM (EST)</li>
            <li>Saturday: 10:00 AM - 4:00 PM (EST)</li>
            <li>Sunday: Closed</li>
          </ul>

          <h2 className="text-xl md:text-2xl font-semibold my-4">Connect with Us</h2>
          <p>Follow us on social media to stay updated on the latest developments, success stories, and industry insights:</p>


          <li>
            <a href={socialMediaLinks.facebook} target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
          </li>
          <li>
            <a href={socialMediaLinks.twitter} target="_blank" rel="noopener noreferrer">
              Twitter
            </a>
          </li>
          <li>
            <a href={socialMediaLinks.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </li>
          <li>
            <a href={socialMediaLinks.instagram} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          </li>


          <h2 className="text-xl md:text-2xl font-semibold my-4">Privacy Policy</h2>
          <p>
            Your privacy is important to us. We will only use the information you provide
            for the purpose of responding to your inquiry. For more details, please refer to our Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Help;
