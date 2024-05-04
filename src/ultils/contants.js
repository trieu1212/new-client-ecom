import icons from './icons'
import path from './path'
export const navigation = [
    {
        id:1,
        value:'HOME',
        path: `/${path.HOME}`
    },
    {
        id:2,
        value:'PRODUCTS',
        path: `/products/0/all`
    },
    {
        id:3,
        value:'BLOGS',
        path: `/${path.BLOGS}`
    },
]
const {GiFurShirt,FaPeopleGroup} = icons
export const adminSidebar = [
    {
        id:1,
        type:'SINGLE',
        value:'Quản lý người dùng',
        path:`/${path.ADMIN}/${path.MANAGE_USER}`,
    },
    {
        id:2,
        type:'PARENT',
        value:'Sản phẩm',
        submenu: [
            {
                text: 'Quản lý sản phẩm',
                path:`/${path.ADMIN}/${path.MANAGE_PRODUCT}`
            },
            {
                text: 'Thêm sản phẩm',
                path:`/${path.ADMIN}/${path.CREATE_PRODUCT}`
            }
        ]
    }
]
