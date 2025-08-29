


import{ Suspense } from 'react'
import { Outlet } from 'react-router'

function Authlayouts() {
  return (
    <div>

        {/* suspense use for loading , when components fetched data show */}
       
       <Suspense fallback={<div>
        Loading..
       </div>}>
       
       <Outlet/>

     </Suspense>
    
    </div>
  )
}

export default Authlayouts
