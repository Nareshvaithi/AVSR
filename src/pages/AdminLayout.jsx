import React from 'react'
import { Outlet } from 'react-router-dom'
import CategoryAdmin from '../components/Admin/CategoryAdmin'
import AdminHeader from '../components/Admin/AdminHeader'

function AdminLayout() {
  return (
    <main>
      <div className='flex'>
            <div className='w-2/12'>
                  <CategoryAdmin />
            </div>
            <div className='w-10/12'>
            <AdminHeader />
                  <Outlet />
            </div>
      </div>
    </main>
  )
}

export default AdminLayout