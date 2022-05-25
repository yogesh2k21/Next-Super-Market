import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Navbar = ({user,logout}) => {
    // console.log(user.value)
    const router = useRouter();

    const [dropDown, setDropDown] = useState(false)

    const removedropDown = ()=>{
        setTimeout(() => {
            setDropDown(false);
        }, 3000);
    }

    return <>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"></link>
        <nav className="bg-white shadow dark:bg-white-500">
            <div className="container px-6 py-4 mx-auto lg:flex lg:justify-between lg:items-center">
                <div>
                <Link href="/"><Image className='cursor-pointer' src="/vercel.svg" width='200' height='20' alt=''/></Link>
                </div>
                <div className="flex flex-col text-gray-600 capitalize dark:text-gray-800 lg:flex lg:px-16 lg:-mx-4 lg:flex-row lg:items-center">
                    <div className="relative mt-4 lg:mt-0 lg:mx-4">
                        <form>
                            <div className="flex items-center justify-center">
                                <div className="flex border-2 rounded">
                                    <input type="text" className="h-9 px-4 py-2 w-80 appearance-none border-0 text-black-600 focus:outline-none" placeholder="Search Products, Brands and more" />
                                    <button className="flex items-center justify-center px-4 border-l" type='submit'>
                                        <svg className="w-6 h-6 text-gray-600" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24">
                                            <path
                                                d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>
                <div className="flex flex-col text-gray-600 capitalize dark:text-gray-500 lg:flex lg:px-16 lg:-mx-4 lg:flex-row lg:items-center">
                <Link href="/explore"><a className='mt-2 transition-colors duration-200 transform lg:mt-0 lg:mx-4 hover:text-gray-900 cursor-pointer dark:hover:text-teal-500'> Explore</a></Link>
                <Link href="/about"><a className='mt-2 transition-colors duration-200 transform lg:mt-0 lg:mx-4 hover:text-gray-900 cursor-pointer dark:hover:text-teal-500'> About</a></Link>


                    <div className='dropdown'>
                        <button onMouseOver={()=>setDropDown(true)} onMouseLeave={removedropDown} className="mt-2 transition-colors duration-200 transform lg:mt-0 lg:mx-4 hover:text-gray-900 cursor-pointer dark:hover:text-teal-500" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">Settings <i className={dropDown===false?"fa fa-angle-down":"fa fa-angle-up"}></i> </button>
                        {dropDown && <div>
                        <ul className="absolute bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-5 m-3 bg-clip-padding border-none">
                            <li>
                                <Link href="/Profile"><a className="text-sm py-2 px-4 font-normal block w-full bg-transparent text-gray-700 hover:bg-gray-100"><i className='fa fa-user-circle'></i> My Profile</a></Link>
                                <Link href="/MyOrder"><a className="text-sm py-2 px-4 font-normal block w-full bg-transparent text-gray-700 hover:bg-gray-100"><i className='fa fa-reorder'></i> My Orders</a></Link>
                                <Link href="/Wishlist"><a className="text-sm py-2 px-4 font-normal block w-full bg-transparent text-gray-700 hover:bg-gray-100"><i className="fa fa-heart"></i> Wishlist</a></Link>
                                <Link href="/Review"><a className="text-sm py-2 px-4 font-normal block w-full bg-transparent text-gray-700 hover:bg-gray-100"><i className="fa fa-comments"></i> My Reviews</a></Link>
                                {!user.value && <Link href="/Login"><a className="text-sm py-2 px-4 font-normal w-full block bg-transparent text-gray-700 hover:bg-gray-100">Login <i className="fa fa-sign-out"></i></a></Link>}
                                {user.value && <a onClick={logout} className="text-sm py-2 px-4 cursor-pointer font-normal w-full block bg-transparent text-gray-700 hover:bg-gray-100">Logout <i className="fa fa-sign-out"></i></a>}
                                <hr/>
                                <Link href="/contact"><a className="text-sm py-2 px-4 font-normal block w-full bg-transparent text-gray-700 hover:bg-gray-100"><i className="mt-1 p-1 fa fa-headphones"></i> 24x7 Customer Care</a></Link>
                            </li>
                        </ul>
                        </div>}
                    </div>
                    <Link href="/cart"><a className="mt-2 transition-colors duration-200 transform lg:mt-0 lg:mx-4 hover:text-gray-900 cursor-pointer dark:hover:text-teal-500"><i className="fa fa-shopping-cart"></i> Cart</a></Link>
                </div>
            </div>
        </nav>
    </>;
}

export default Navbar