import React from 'react'
import AdminDashBoard from './AdminDashboard'

export const metadata = {
  title: "Admin Dashboard | Creative Dental Surgery",
  description: "Manage appointments, patient records, treatments, and more with the admin dashboard for Creative Dental Surgery.",
  openGraph: {
    title: "Admin Dashboard | Creative Dental Surgery",
    description: "Admin panel for managing dental procedures, appointments, patient profiles, and more. Secure and easy access for authorized users.",
    site_name: "Creative Dental Surgery",
  },
};

const page = () => {
  return (
    <>
      <AdminDashBoard/>
    </>
  )
}

export default page