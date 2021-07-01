import React, { useState, useRef } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './home.scss';
import mainLogo from '../images/mainLogo.png';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

function Homepage({ socket }) {
  const [username, setusername] = useState('');
  const roomname = 'Club';
  const [pic, setPic] = useState(0);
  const sliderRef = useRef(null);
  const slickProps = {
    infinite: true,
    slidesToScroll: 1,
    slidesToShow: 3,
    dots: false,
    centerMode: false,
  };
  //pass the username and roomname
  const sendData = () => {
    if (username !== '' && pic !== 0) {
      socket.emit('joinRoom', { username, roomname, pic });
    } else {
      alert('please fill all fields');
    }
  };

  return (
    <div className='homepage'>
      <h1>Welcome to</h1>
      <img className='mainLogo' alt='Chatter' src={mainLogo} />
      <span className='explainText'>Input your user name</span>
      <input
        placeholder='User name'
        value={username}
        onChange={(e) => setusername(e.target.value)}
      ></input>
      <span className='explainText'>Choose avatar</span>
      <Slider className='carousel' ref={sliderRef} {...slickProps}>
        <button className={pic === 1 && 'chosen'} onClick={() => setPic(1)}>
          <img alt='avatar' src='/images/1.png' />
        </button>
        <button className={pic === 2 && 'chosen'} onClick={() => setPic(2)}>
          <img alt='avatar' src='/images/2.png' />
        </button>
        <button className={pic === 3 && 'chosen'} onClick={() => setPic(3)}>
          <img alt='avatar' src='/images/3.png' />
        </button>
        <button className={pic === 4 && 'chosen'} onClick={() => setPic(4)}>
          <img alt='avatar' src='/images/4.png' />
        </button>
        <button className={pic === 5 && 'chosen'} onClick={() => setPic(5)}>
          <img alt='avatar' src='/images/5.png' />
        </button>
        <button className={pic === 6 && 'chosen'} onClick={() => setPic(6)}>
          <img alt='avatar' src='/images/6.png' />
        </button>
      </Slider>
      <Link
        to={
          username !== '' && pic !== 0 ? `/chat/${roomname}/${username}` : '/'
        }
      >
        <button className='joinBtn' onClick={sendData}>
          Join
        </button>
      </Link>
    </div>
  );
}

export default Homepage;
