import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './home.scss';
import ImgHome from '../../assets/burger1.jpg';
import ImgHome2 from '../../assets/burger2.jpg';

function Home() {
  const url = 'https://favqs.com/api/qotd';
  const [quote, setQuote] = useState({});

  useEffect(() => {
    async function fetchData() {
      await axios.get(url)
      .then((res) => {
        setQuote({
          author: res.data.quote.author,
          body: res.data.quote.body
        });
      })
      .catch((err) => { console.log(err); });
    }
    fetchData();
    
  }, []);

  return (
    <>    
    <section className='home__welcome'>
      <div className='home__welcome__info'>
        <h1 className='home__welcome__info__title'>Najlepsze burgery w Polsce!</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam convallis ultrices mauris, at vestibulum nibh pulvinar eu.</p>
        <Link to='/menu' className='home__welcome__info__link'>
          Odkryj nasze menu!
        </Link>
      </div>
      <div className='home__welcome__hero'>
        <img src={ImgHome}  alt='Burger' className='home__welcome__hero__img' />
      </div>
    </section>

    <section className='home__about'>
      <div className='home__about__hero'>
        <img src={ImgHome2}  alt='Burger' className='home__about__hero__img' />
      </div>
      <div className='home__about__info'>
        <h1 className='home__about__info__title'>Trochę o nas...</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis volutpat turpis nec tortor vulputate suscipit. Quisque et nunc velit. Vestibulum id mattis nibh. Quisque finibus dui a purus sodales, ut eleifend mi feugiat. Maecenas luctus suscipit velit, eget pharetra libero interdum id.</p>
        <p className='home__about__info__quote'>
          { quote.body? (<span>{quote.body}</span>) : ('') }
          { quote.author? (<span>~{quote.author}</span>) : ('') }
        </p>
      </div>
    </section>

    </>
  )
}

export default Home;