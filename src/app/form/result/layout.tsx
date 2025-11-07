import React from 'react'

function Layout ({children}: {children: React.ReactNode}) {
  return (
        <div className="min-h-screen bg-gradient-to-b from-[#FAFBF8] to-white pt-36">
            {children}
        </div>
  )
}

export default Layout