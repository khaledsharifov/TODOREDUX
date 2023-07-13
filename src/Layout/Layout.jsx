import React  from 'react'
import {Outlet, Link, useLocation} from "react-router-dom"


const Layout = () => {
  const {pathname} = useLocation()
  return (
    <div>
        {/* <div className="navbar">
            <ul className='flex justify-center gap-8'>
                <Link  to={"/"}>
                  {pathname == "/" ? ( <li className='text-[#6d50ff]'>Home</li>): (  <li>Home</li>)}
                </Link>
                <Link to={"about"}>
                {pathname == "/about" ? ( <li className='text-[#6d50ff]'>About</li>): ( <li>About</li>)}
                </Link>
                <Link to={"contacts"}>
                {pathname == "/contacts" ? ( <li className='text-[#6d50ff]'>Contacts</li>): ( <li>Contacts</li>)}
                </Link>
            </ul>
        </div> */}
        <Outlet/>
        {/* <div className="footer">Footer</div> */}
    </div>
  )
}

export default Layout