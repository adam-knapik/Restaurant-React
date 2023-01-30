import React from 'react';
import { Link } from 'react-router-dom';
import { NavItems } from '../../data/NavItems';
import { BsFacebook, BsInstagram, BsTwitter, BsTelephone } from 'react-icons/bs';
import { FiMapPin, FiMail } from 'react-icons/fi';
import { MdOutlineWatchLater } from 'react-icons/md';
import ImgSeparator from '../../assets/knife.png';
import './footer.scss';

function Footer() {
  return (
    <footer className='footer'>
      <Link to='/' className='footer__logo'>Burgerownia</Link>

      <div className='footer__info'>
        <div className='footer__info__contact'>
            <div className='footer__info__contact__item'>
              <a href="https://www.google.com/maps/place/Pleszewska+1,+61-139+Pozna%C5%84,+Poland/@52.396436,16.955507,12z/data=!4m6!3m5!1s0x47045b0f02c47085:0xb42d16285492bd4e!8m2!3d52.3964356!4d16.9555068!16s%2Fg%2F11dfjxfc3r?hl=en" target='_blank' rel="noreferrer" className='footer__info__contact__item__link'>
                <FiMapPin /> 
                Pleszewka 1, Poznań
              </a>
            </div>
            <div className='footer__info__contact__item'>
              <a href="tel: +48555665995" className='footer__info__contact__item__link'>
                <BsTelephone /> 
                (+48) 555 665 995
              </a>
            </div>
            <div className='footer__info__contact__item'>
              <a href="mailto: biuro@burgerownia.pl" className='footer__info__contact__item__link'>
                <FiMail />   
                 biuro@burgerownia.pl
              </a>
            </div>
            <div className='footer__info__contact__item'>
              <MdOutlineWatchLater /> 
              pon-pt: 11:00 - 22:00 <br/>
              sob-nd: 12:00 - 23:00
          </div>   
        </div>      

          <div className='footer__info__separator'>
            <img src={ImgSeparator} alt='knfie separator' className='footer__info__separator__img'/>
          </div>

          <div className='footer__info__permalinks'>
            { 
              NavItems.map((item, index) => {
                return (
                  <Link key={index} to={item.url} className='footer__info__permalinks__link'>{item.icon} {item.title}</Link>
                )
              })
            }
          </div>
      </div>

      <div className='footer__socials'>
        <a href='https://www.facebook.com' target='_blank' rel="noreferrer" className='footer__socials__item'>
          <BsFacebook className='footer__socials__item__icon' />
        </a>
        <a href='https://www.instagram.com' target='_blank' rel="noreferrer" className='footer__socials__item'>
          <BsInstagram className='footer__socials__item__icon' />
        </a>
        <a href='https://www.twitter.com' target='_blank' rel="noreferrer" className='footer__socials__item'>
          <BsTwitter className='footer__socials__item__icon' />
        </a>
      </div>
    </footer>
  )
}

export default Footer;