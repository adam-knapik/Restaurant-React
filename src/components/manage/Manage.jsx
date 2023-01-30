import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './manage.scss';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';

function Manage() {
  const url = 'https://my-json-server.typicode.com/adam-knapik/restaurant-react';
  const [burgers, setBurgers] = useState([]);
  const [additives, setAdditives] = useState([]);
  const [coldDrinks, setColdDrinks] = useState([]);

  const form = useRef();
  const [newLink, setNewLink] = useState('burgers');
  const [newId, setNewId] = useState('');
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newDescription, setNewDescription] = useState('');
  //const [newMethod, setNewMethod] = useState('');
  //const [newUrl, setNewUrl] = useState('');

  const message = document.querySelector('.manage__message');

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

  const handleDelete = (link, id, name) => {
    axios.delete(url + '/' + link + '/' + id)
    .then((res) => {
      console.log('Delete successful!', link, id); 
      message.setAttribute('style', 'color: green');
      message.innerHTML = 'Usunięto: '+ id + '  ' + name;
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      fetchData();
    })
    .catch((err) => {
      console.log(err);
      message.setAttribute('style', 'color: red;');
      message.innerHTML = 'Błąd podczas usunięcia: '+ id + '  ' + name;
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0; 
    });   
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleInput(newLink, newId);
  }

  const handleInput = async(link, id) => {
    var newMethod = '';
    var newUrl = '';
    if(link.length >= parseInt(id)) {
      newMethod = 'put';
      newUrl = `${url}/${link}/${id}`;
    } else {
      newMethod = 'post';
      newUrl = `${url}/${link}`;
    }
    try { 
      if(link==='burgers') {
        const { data } = await axios({ 
          method: newMethod,
          url: newUrl,
          data: { 
            id: newId,
            name: newName,
            price: newPrice,
            description: newDescription
          }
        });
        console.log(data); 
        message.setAttribute('style', 'color: green');
        message.innerHTML = 'Zapisano zmiany: ' + newId + ' ' + newName;
        clearForm();
      } else if(link==='additives' || link === 'cold_drinks') {
        const { data } = await axios({ 
          method: newMethod,
          url: newUrl,
          data: { 
            id: newId,
            name: newName,
            price: newPrice,
            quantity: newDescription
          }
        });
        console.log(data); 
        message.setAttribute('style', 'color: green');
        message.innerHTML = 'Zapisano zmiany: ' + newId + ' ' + newName;
        clearForm();
      } else {
        console.log('Error: bad link');
        message.setAttribute('style', 'color: red;');
        message.innerHTML = 'Błąd: zły link API';
      }     
    } catch (err) {
      if (err.response.status === 404) {
        console.log('Error 404');
        message.setAttribute('style', 'color: red;');
        message.innerHTML = 'Błąd: 404';
      } else {
        console.log(err.message);
        message.setAttribute('style', 'color: red;');
        message.innerHTML = 'Błąd';
      }
    }
  }

  const clearForm = () => {
    //setNewMethod(''); 
    //setNewUrl(''); 
    setNewLink('burgers'); 
    setNewId(''); 
    setNewName('');
    setNewPrice(''); 
    setNewDescription('');
  }

  const setForm = (link, id, name, price, description) => {
    setNewLink(link); 
    setNewId(id); 
    setNewName(name);
    setNewPrice(price); 
    setNewDescription(description);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0; 
  }

  return (
    <section className='manage'>
      <span className='manage__message'></span>

      <form ref={form} onSubmit={handleSubmit} className='manage__form'>
        <select value={newLink} onChange={(e) => setNewLink(e.target.value)} className='manage__form__input'>
          <option value='burgers'>Burgers</option>
          <option value='additives'>Additives</option>
          <option value='cold_drinks'>Cold Drinks</option>
        </select>
        <input type='number' name='id' placeholder='Id' value={newId} onChange={(e) => setNewId(e.target.value)} className='manage__form__input' required/>
        <input type='text' name='name' placeholder='Nazwa' value={newName} onChange={(e) => setNewName(e.target.value)} className='manage__form__input' />
        <input type='text' name='price' placeholder='Cena' value={newPrice} onChange={(e) => setNewPrice(e.target.value)} className='manage__form__input' />
        <input type='text' name='description' placeholder='Opis / Ilość' value={newDescription} onChange={(e) => setNewDescription(e.target.value)} className='manage__form__input' />
        <button type='submit' className='manage__form__button'>Zatwierdź</button>
      </form>

      <div className='manage__container'>
        <table className='manage__container__table'>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nazwa</th>
              <th>Cena</th>
              <th>Opis</th>
              <th>Edycja</th>
              <th>Usuń</th>
            </tr>
          </thead>
          <tbody>
            {
              burgers && burgers.length > 0 ? 
              burgers.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.price}zł</td>
                    <td>{item.description}</td>
                    <td><button onClick={() => setForm('burgers', item.id, item.name, item.price, item.description)} className='manage__container__table__btnEdit'><AiOutlineEdit /></button></td>
                    <td><button onClick={() => handleDelete('burgers', item.id, item.name)} className='manage__container__table__btnDelete'><AiOutlineDelete /></button></td>
                  </tr>
                )
              }) : null
            }
          </tbody>
        </table>
      </div>

      <div className='manage__container'>
        <table className='manage__container__table'>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nazwa</th>
              <th>Cena</th>
              <th>Ilość</th>
              <th>Edycja</th>
              <th>Usuń</th>
            </tr>
          </thead>
          <tbody>
            {
              additives && additives.length > 0 ? 
              additives.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.price}zł</td>
                    <td>{item.quantity}</td>
                    <td><button onClick={() => setForm('additives', item.id, item.name, item.price, item.quantity)} className='manage__container__table__btnEdit'><AiOutlineEdit /></button></td>
                    <td><button onClick={() => handleDelete('additives', item.id, item.name)} className='manage__container__table__btnDelete'><AiOutlineDelete /></button></td>
                  </tr>
                )
              }) : null
            }
          </tbody>
        </table>
      </div>

      <div className='manage__container'>
        <table className='manage__container__table'>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nazwa</th>
              <th>Cena</th>
              <th>Ilość</th>
              <th>Edycja</th>
              <th>Usuń</th>
            </tr>
          </thead>
          <tbody>
            {
              coldDrinks && coldDrinks.length > 0 ? 
              coldDrinks.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.price}zł</td>
                    <td>{item.quantity}</td>
                    <td><button onClick={() => setForm('cold_drinks', item.id, item.name, item.price, item.quantity)} className='manage__container__table__btnEdit'><AiOutlineEdit /></button></td>
                    <td><button onClick={() => handleDelete('cold_drinks', item.id, item.name)} className='manage__container__table__btnDelete'><AiOutlineDelete /></button></td>
                  </tr>
                )
              }) : null
            }
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Manage;