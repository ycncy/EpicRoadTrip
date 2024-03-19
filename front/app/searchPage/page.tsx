import React from 'react'
import Sidebar from '../components/SideBar'
import Navbar from '../components/Navbar';

const SearchPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <Sidebar />
      <div className="container mx-auto px-4 ">
      </div>
    </div>
   
  )
}

export default SearchPage;