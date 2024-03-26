import React from 'react'
import Sidebar from '../../components/SideBar'
import Navbar from '../../components/Navbar';

async function Trip({ params }: { params: { id: string } }) {
  
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <Sidebar tripId={params.id} />
      <div className="container mx-auto px-4 ">
      </div>
    </div>
   
  )
}

export default Trip;