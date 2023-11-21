import React from 'react'
import { UserHeader } from '../../componets/userComponent/userHeader'
import { UserFooter } from '../../componets/userComponent/userFooter'
const Home = () => {

  return (
    <div>

      <UserHeader />

      {/* Banner Section */}
      <section className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white py-16">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to  webwork</h1>
          <p className="text-lg md:text-xl mb-8">Your excat web solotion patner</p>

        </div>
      </section>

      <div className="bg-gray-100">

        {/* Hero Section */}

        <div className="container mx-auto text-center text-indigo-900">
          <h1 className="text-5xl font-bold mb-4">Are You Searching For A Developer</h1>
          <p className="text-xl mb-8">Discover amazing things here!</p>

        </div>


        {/* Features Section */}
        <section id="features" className="py-12 ">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">Our Features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Feature 1 */}
              <div className="p-6 border border-indigo-900 rounded-lg shadow-md ml-2">
                <h3 className="text-xl font-semibold mb-2">Feature 1</h3>
                <p className="text-gray-700">The site is completely free for you.</p>
              </div>

              {/* Feature 2 */}
              <div className="p-6 border border-indigo-900 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2 text-pink-600">Feature 2</h3>
                <p className="text-gray-700">You can select a developer  based on Your intrest .</p>
              </div>

              {/* Feature 3 */}
              <div className="p-6 border border-indigo-900 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">Feature 3</h3>
                <p className="text-gray-700">You can chat and connect the developer.</p>
              </div>

              {/* Feature 4 */}
              <div className="p-6 border border-indigo-900 rounded-lg shadow-md mr-2">
                <h3 className="text-xl font-semibold mb-2 text-pink-600">Feature 4</h3>
                <p className="text-gray-700">You can rate and connect on developer.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <UserFooter />
    </div>
  )
}
export default Home