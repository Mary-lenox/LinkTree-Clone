import React from 'react'


const Navbar = () => {
    return (
        <div>
            <nav className='bg-white z-10 items-center absolute rounded-full w-[85vw] p-3 flex justify-between right-[7vw] top-[7vh]'>
                <div className="logo flex gap-15 items-center">
                    <img src="/logo.svg" alt="logo" className='w-20 pl-3'/>
                <ul className='flex gap-7'>
                    <li>Templates</li>
                    <li>Marketplace</li>
                    <li>Pricing</li>
                    <li>Products</li>
                    <li>Learn</li>
                </ul>
                </div>

                <div className="button flex gap-5 font-semibold">
                    <button className='login text-gray-500'>Log in</button>
                    <button className='signup rounded-full bg-slate-900 text-white px-5 py-5'>Signup for free</button>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
