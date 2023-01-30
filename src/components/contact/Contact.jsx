import React, { useEffect, useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import swal from 'sweetalert';
//import { BsFacebook, BsInstagram, BsTwitter } from 'react-icons/bs';
import './contact.scss';

function Contact() {
    const form = useRef();
    const [email, setEmail] = useState( () => {
        const savedItem = localStorage.getItem("Email");
        const parsedItem = JSON.parse(savedItem);
        return parsedItem || "";
    });
    const [message, setMessage] = useState(() => {
        const savedItem = localStorage.getItem("Message");
        const parsedItem = JSON.parse(savedItem);
        return parsedItem || "";
    });

    useEffect(() => {
        localStorage.setItem("Email", JSON.stringify(email));
        localStorage.setItem("Message", JSON.stringify(message));
    }, [email, message])

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm('service', 'template', form.current, 'apiKey')
            .then((res) => {
                e.target.reset();
                setEmail('');
                setMessage('');
                swal('Dziękuje za wiadomośc', 'Wiadomość została wysłana poprawnie.', 'success');
            },
            (error) => {  
                swal('Coś poszło nie tak', 'Spróbuj ponownie później', 'error');
                console.log(error.text);
            });
    }
  return (
    <>
        <section className='contact'>
            <h1 className='contact__title'>Napisz do nas!</h1>
            <form className='contact__form' ref={form} onSubmit={sendEmail}>
                <input className='contact__form__email' type='email' placeholder='E-mail' value={email} name='email' onChange={(e) => setEmail(e.target.value)} required />
                <textarea className='contact__form__message' placeholder='Wiadomość' value={message} name='message' onChange={(e) => setMessage(e.target.value)} required ></textarea>
                <button className='contact__form__button'>Wyślij</button>
            </form>
        </section>
        
        <section className='contact__map'>
            <h1 className='contact__map__title'>Odwiedź nas!</h1>
            <div className='contact__map__location'>
                <iframe 
                    className='contact__map__location__iframe'
                    width="520" 
                    height="400" 
                    frameBorder="0" 
                    marginHeight="0" 
                    marginWidth="0" 
                    id="gmap_canvas"
                    title="Google maps localization"
                    src="https://maps.google.com/maps?width=520&amp;height=400&amp;hl=en&amp;q=Pleszewska%201%20Pozna%C5%84+(Groomer)&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed" 
                />
            </div>
        </section>
    </>
  )
}

export default Contact;