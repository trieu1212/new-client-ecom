import React, { Fragment } from 'react'
import Logo from '../assets/images/logo.jpg'
import { adminSidebar } from '../ultils/contants'
import { Link, NavLink } from 'react-router-dom'
import icons from '../ultils/icons'
import path from '../ultils/path'
const AdminSidebar = () => {
    const { GiFurShirt, FaPeopleGroup } = icons
    return (
        <>
            <div className='bg-gray-600 p-4 h-full'>
                <div className='flex flex-col py-4 items-center justify-center gap-2'>
                    <Link to={`/${path.HOME}`}>
                        <img src={Logo} alt="" className='w-[80px] object-contain' />
                    </Link>
                    <small>Admin</small>
                </div>
                <div>
                    {console.log(adminSidebar)}
                    {adminSidebar.map((item) => {
                        <Fragment key={item.id}>
                            {item.type === 'single' &&
                                <NavLink to={item.path}>
                                    <span>
                                        {item.value === 'Quản lý người dùng' && <FaPeopleGroup />}
                                    </span>
                                    <span>
                                        {item.value}
                                    </span>
                                </NavLink>
                            }
                            {item.type === 'parent' &&
                                <div>
                                    <div>
                                        <span>
                                            {item.id === 2 && <GiFurShirt />}
                                        </span>
                                        <span>
                                            {item.value}
                                        </span>
                                    </div>
                                    <div>
                                        {item.submenu.map((subitem) => {
                                            <NavLink key={subitem.text} to={subitem.path}>
                                                {subitem.text}
                                            </NavLink>
                                        })}
                                    </div>
                                </div>
                            }
                        </Fragment>
                    })}
                </div>
            </div>
        </>
    )
}

export default AdminSidebar