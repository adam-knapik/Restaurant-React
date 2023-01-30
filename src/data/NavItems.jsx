import { AiOutlineHome } from 'react-icons/ai';
import { BsPerson } from 'react-icons/bs';
import { FiMail } from 'react-icons/fi';
import { RiRestaurant2Line } from 'react-icons/ri';
export const NavItems = [
    {
        title: 'Strona Główna',
        url: '/',
        icon: <AiOutlineHome />
    },
    {
        title: 'Menu',
        url: '/menu',
        icon: <RiRestaurant2Line />
    },
    {
        title: 'Kontakt',
        url: '/kontakt',
        icon: <FiMail />
    },
    {
        title: 'Login',
        url: '/login',
        icon: <BsPerson />
    }
];