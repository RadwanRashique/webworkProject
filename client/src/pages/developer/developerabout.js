import React from 'react';
import { DeveloperHeader } from '../../componets/developerComponent/developerHeader'

import './DeveloperAbout.css'

const About = () => {
  return (
    <div>

< DeveloperHeader />
    <div className='container'>

   
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 text-white py-16">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">About Us</h1>
          <p className="text-lg md:text-xl mb-8">From here you will get a clear picture about us.</p>
        </div>
      </section>

      {/* About Content */}
      <section className="bg-white py-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Image */}
            <div className="md:order-2">
              <img
                src="/images/userImages/aboutus1.jpg" // Replace with your image URL
                alt="About Us"
                className="mx-auto w-full md:w-2/3 rounded-lg shadow-lg"
              />
            </div>

            {/* Text */}
            <div className="md:order-1 ml-4">
              <h2 className="text-3xl font-semibold mb-4">Why we?</h2>
              <p className="text-gray-700 ">
                Robust Developer Network: Access a global network of top-tier developers.
                Seamless Collaboration: Our platform ensures smooth communication and project management.
                Verified Developers: Our subscription model guarantees quality and commitment.
                Tailored Matches: Find developers or projects that align perfectly with your goals.
              </p>
              <h2 className="text-3xl font-semibold mb-4">Our Misson</h2>
              <p className="text-gray-700 mt-4 ">
                At WebWork, we're on a mission to simplify
                web development collaborations. By providing developers
                with a subscription-based platform and offering clients
                direct access to skilled developers, we're revolutionizing
                the way websites are created.

              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-4">Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white rounded-lg p-4 shadow-md ml-2">
              <img
                src="/images/userImages/tem1.avif"
                alt="Team Member 1"
                className="w-32 h-32 mx-auto rounded-full"
              />
              <h3 className="text-xl font-semibold mt-2">John Doe</h3>
              <p className="text-gray-600">Co-founder</p>
            </div>

            {/* Team Member 2 */}
            <div className="bg-white rounded-lg p-4 shadow-md">
              <img
                src="images/userImages/team3.avif"
                alt="Team Member 2"
                className="w-32 h-32 mx-auto rounded-full"
              />
              <h3 className="text-xl font-semibold mt-2">Jane Smith</h3>
              <p className="text-gray-600">Designer</p>
            </div>

            {/* Team Member 3 */}
            <div className="bg-white rounded-lg p-4 shadow-md">
              <img
                src="images/userImages/team4.avif"
                alt="Team Member 3"
                className="w-32 h-32 mx-auto rounded-full"
              />
              <h3 className="text-xl font-semibold mt-2">David Johnson</h3>
              <p className="text-gray-600">Developer</p>
            </div>

            {/* Team Member 4 */}
            <div className="bg-white rounded-lg p-4 shadow-md mr-2">
              <img
                src="/images/userImages/tem2.jpg"
                alt="Team Member 4"
                className="w-32 h-32 mx-auto rounded-full"
              />
              <h3 className="text-xl font-semibold mt-2">Emily Davis</h3>
              <p className="text-gray-600">Marketing</p>
            </div>
          </div>
        </div>
      </section>

    </div>
    </div>
  );
}

export default About;
