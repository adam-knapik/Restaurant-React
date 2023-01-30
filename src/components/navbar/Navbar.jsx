import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import { NavItems } from '../../data/NavItems';
import { FaBars, FaTimes } from 'react-icons/fa'
import './navbar.scss';

function Navbar() {
  const [isMobile, setIsMobile] = useState(false);

  return (
    <nav className='navbar'>
      <NavLink to='/' className='navbar__logo'>
        Burgerownia
      </NavLink>

      <div className={ isMobile ? 'navbar__links active' : 'navbar__links' }>
        {
          NavItems.map((item, index) => {
            return (
              <NavLink 
                key={index} 
                to ={item.url} 
                className={({ isActive }) => (isActive ? 'navbar__link active' : 'navbar__link')} 
                onClick={() => setIsMobile(false)}
              >
                {item.title}
              </NavLink>
            )
          })
        }
        </div>
        <button className='navbar__mobile' 
        onClick={() => setIsMobile(!isMobile)}
        >
          { isMobile ? (
            <FaTimes className='navbar__mobile__icon'/>
            ): (
            <FaBars className='navbar__mobile__icon' />
          )}
        </button>
    </nav>
  )
}

export default Navbar