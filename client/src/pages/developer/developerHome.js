import React from 'react'
import { DeveloperHeader } from '../../componets/developerComponent/developerHeader'
import './developerHome.css'
const developerHome = () => {

  return (
    <div  >
      <DeveloperHeader />
      <section className="text-white py-16 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome Developer</h1>
          <p className="text-lg md:text-xl mb-8">Your exact partner to find webwork</p>
        </div>
      </section>

      <div className="full-width-container text-center text-indigo-900">
        <h1 className="text-5xl font-bold mb-2 text-black">Are You Searching For Webwork</h1>
        <p className="text-xl mb-4 text-black font-bold">Discover amazing things here!</p>
      </div>



      <section id="features" className="py-8">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Our Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="p-4 ml-2 border border-indigo-900 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Feature 1</h3>
              <p className="text-gray-700">You can take a subscription plan.</p>
            </div>

            <div className="p-4 border border-indigo-900 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2 text-pink-600">Feature 2</h3>
              <p className="text-gray-700">You will get followed by users.</p>
            </div>

            <div className="p-4 border border-indigo-900 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Feature 3</h3>
              <p className="text-gray-700">You will get chat from users and you can chat back.</p>
            </div>

            <div className="p-4 border border-indigo-900 rounded-lg shadow-md mr-2">
              <h3 className="text-xl font-semibold mb-2 text-pink-600">Feature 4</h3>
              <p className="text-gray-700">You can find work in your domain itself.</p>
            </div>
          </div>
        </div>
      </section>
    </div>


  )
}
export default developerHome