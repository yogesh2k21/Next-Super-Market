import React, { useState, useEffect, memo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { AiOutlineShoppingCart,AiOutlineHeart } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { GoListUnordered } from 'react-icons/go';
import { MdOutlineReviews,MdLogout } from 'react-icons/md';
import { RiCustomerService2Fill } from 'react-icons/ri';

const Navbar = ({user,logout,cartLength,searchKeyword,setSearchKeyword,getSearchData}) => {
    // console.log(user.value)
    const router = useRouter();
    
    const [dropDown, setDropDown] = useState(false)

    useEffect(() => {
        console.log("hey i am navbar.js useEffect");
        
    
      }, []); //passing router.query is to Re-render the _app so that this useEffect runs, now it will re render on every URL change.

    const removedropDown = ()=>{
        setTimeout(() => {
            setDropDown(false);
        }, 3000);
    }

    return <>
        <nav className="bg-white shadow dark:bg-white-500">
            <div className="container px-6 py-4 mx-auto lg:flex lg:justify-between lg:items-center">
                <div>
                <Link href="/" passHref><Image className='cursor-pointer' src="/vercel.svg" width='200' height='20' alt=''/></Link>
                </div>
                <div className="flex flex-col text-gray-600 capitalize dark:text-gray-800 lg:flex lg:px-16 lg:-mx-4 lg:flex-row lg:items-center">
                    <div className="relative mt-4 lg:mt-0 lg:mx-4">
                        <div>
                            <div className="flex items-center justify-center">
                                <div className="flex border-2 rounded">
                                    <button disabled={searchKeyword===""?true:false} onClick={()=>{setSearchKeyword(""),router.push('/')}} className="flex items-center justify-center px-4 border-l">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    </button>
                                    <input type="text" value={searchKeyword} onChange={(e)=>setSearchKeyword(e.target.value)} className="h-9 px-4 py-2 w-60 appearance-none border-0 text-black-600 focus:outline-none" placeholder="Search Product, Brand & more" />
                                    <button  disabled={searchKeyword===""?true:false} onClick={getSearchData} className="flex items-center justify-center px-4 border-l">
                                        <svg className="w-6 h-6 text-gray-600" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24">
                                            <path
                                                d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="flex flex-col text-gray-600 capitalize dark:text-gray-500 lg:flex lg:px-16 lg:-mx-4 lg:flex-row lg:items-center">
                <Link passHref href="/explore"><a className='mt-2 transition-colors duration-200 transform lg:mt-0 lg:mx-4 hover:text-gray-900 cursor-pointer dark:hover:text-teal-500'> Explore</a></Link>
                <Link passHref href="/about"><a className='mt-2 transition-colors duration-200 transform lg:mt-0 lg:mx-4 hover:text-gray-900 cursor-pointer dark:hover:text-teal-500'> About</a></Link>
                {!user.value && <Link passHref href="/Login"><a className='mt-2 transition-colors duration-200 transform lg:mt-0 lg:mx-4 hover:text-gray-900 cursor-pointer dark:hover:text-teal-500'>Login</a></Link>}

                {/* {!user.value && <Link href="/Login"><a className="text-sm py-2 px-4 font-normal w-full block bg-transparent text-gray-700 hover:bg-gray-100">Login <i className="fa fa-sign-out"></i></a></Link>} */}
                    {user.value && <div className='dropdown'>
                        <button onMouseOver={()=>setDropDown(true)} onMouseLeave={removedropDown} className="mt-2 transition-colors duration-200 transform lg:mt-0 lg:mx-4 hover:text-gray-900 cursor-pointer dark:hover:text-teal-500" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">Settings <i className={dropDown===false?"fa fa-angle-down":"fa fa-angle-up"}></i> </button>
                        {dropDown && <div>
                        <ul className="absolute bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-5 m-3 bg-clip-padding border-none">
                            <li>
                                <Link passHref href="/Profile"><a className="text-sm py-2 flex items-center px-4 font-normal w-full bg-transparent text-gray-700 hover:bg-gray-100"><CgProfile className='mr-1'/> My Profile</a></Link>
                                <Link passHref href="/MyOrders"><a className="text-sm py-2 px-4 flex items-center font-normal w-full bg-transparent text-gray-700 hover:bg-gray-100"><GoListUnordered className='mr-1'/> My Orders</a></Link>
                                <Link passHref href="/Wishlist"><a className="text-sm py-2 px-4 flex items-center font-normal w-full bg-transparent text-gray-700 hover:bg-gray-100"><AiOutlineHeart className='mr-1'/> Wishlist</a></Link>
                                <Link passHref href="/MyReview"><a className="text-sm py-2 px-4 flex items-center font-normal w-full bg-transparent text-gray-700 hover:bg-gray-100"><MdOutlineReviews className='mr-1'/> My Reviews</a></Link>
                                {/* {!user.value && <Link href="/Login"><a className="text-sm py-2 px-4 font-normal w-full block bg-transparent text-gray-700 hover:bg-gray-100">Login <i className="fa fa-sign-out"></i></a></Link>} */}
                                {user.value && <a onClick={logout} className="text-sm py-2 px-4 flex items-center cursor-pointer font-normal w-full bg-transparent text-gray-700 hover:bg-gray-100">Logout <MdLogout className='ml-2 mt-1'/></a>}
                                <hr/>
                                <Link passHref href="/contact"><a className="text-sm py-2 px-4 flex items-center mr-2 font-normal w-full bg-transparent text-gray-700 hover:bg-gray-100"><RiCustomerService2Fill className=' mr-2'/> 24x7 Customer Care</a></Link>
                            </li>
                        </ul>
                        </div>}
                    </div>}
                    {user.value && <Link passHref href="/Cart"><a className="mt-2 flex items-center transition-colors duration-200 transform lg:mt-0 lg:mx-4 hover:text-gray-900 cursor-pointer dark:hover:text-teal-500">Cart<AiOutlineShoppingCart className='ml-1'/>
                    {cartLength!=0 && <span className="absolute top-0 right-0 inline-flex items-center justify-center p-1 px-2 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-indigo-600 rounded-full">{cartLength}</span>}</a></Link>}
                </div>
            </div>
        </nav>
    </>;
}

export default memo(Navbar);