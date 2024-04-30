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
        path: `/${path.PRODUCTS}`
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
        type:'single',
        value:'Quản lý người dùng',
        path:`/${path.ADMIN}/${path.MANAGE_PRODUCT}`,
    },
    {
        id:2,
        type:'parent',
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
