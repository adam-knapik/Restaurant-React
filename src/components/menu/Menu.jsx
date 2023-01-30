import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './menu.scss';
import ImgBurger from '../../assets/burger1.jpg';
import ImgAdditive from '../../assets/fries.jpg';
import ImgDrink from '../../assets/juice.jpg';
 
function Menu() {
  const url = 'https://my-json-server.typicode.com/adam-knapik/restaurant-react';
  const [burgers, setBurgers] = useState([]);
  const [additives, setAdditives] = useState([]);
  const [coldDrinks, setColdDrinks] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    await axios.get(url + '/db')
    .then((res) => { 
      setBurgers(res.data.burgers);
      setAdditives(res.data.additives);
      setColdDrinks(res.data.cold_drinks)
    })
    .catch((err) => { console.log(err); });
  }

  return (
    <section className='menu'>
        <div className='menu__category'>
          <h1 className='menu__category__title'>Burgery</h1>
          <div className='menu__category__card'>
            <div className='menu__category__card__items'>
            {
              burgers && burgers.length > 0 ? ( 
                
                burgers.map((item, index) => {
                  return (
                    <div key={index} className='menu__category__card__item'>
                      <h3>{item.id}. {item.name}</h3>
                      <p>{item.price} zł - {item.description}</p>
                    </div>

                  )
                })
              ) : null
            }
            </div>
            <div className='menu__category__card__preview'>
              <img src={ImgBurger} alt='burger' className='menu__category__card__preview__image' />
            </div>
          </div>
        </div>

        <div className='menu__category'>
          <h1 className='menu__category__title'>Dodatki</h1>
          <div className='menu__category__card menu__category__card--rotate'>
            <div className='menu__category__card__preview'>
              <img src={ImgAdditive} alt='burger' className='menu__category__card__preview__image' />
            </div>
            <div className='menu__category__card__items'>
            {
              additives && additives.length > 0 ? ( 
                
                additives.map((item, index) => {
                  return (
                    <div key={index} className='menu__category__card__item'>
                      <h3>{item.id}. {item.name}</h3>
                      <p>{item.price} zł - {item.quantity}</p>
                    </div>

                  )
                })
              ) : null
            }
            </div>
          </div>
        </div>

        <div className='menu__category'>
          <h1 className='menu__category__title'>Zimne napoje</h1>
          <div className='menu__category__card'>
            <div className='menu__category__card__items'>
            {
              coldDrinks && coldDrinks.length > 0 ? ( 
                
                coldDrinks.map((item, index) => {
                  return (
                    <div key={index} className='menu__category__card__item'>
                      <h3>{item.id}. {item.name}</h3>
                      <p>{item.price} zł - {item.quantity}</p>
                    </div>

                  )
                })
              ) : null
            }
            </div>
              <div className='menu__category__card__preview'>
                <img src={ImgDrink} alt='burger' className='menu__category__card__preview__image' />
              </div>
          </div>
        </div>
    </section>
  )
}

export default Menu;