import './chat.scss';
import { to_Decrypt, to_Encrypt } from '../aes.js';
import { process } from '../store/action/index';
import * as moment from 'moment';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import mainLogo from '../images/mainLogo.png';

function Chat({ username, roomname, socket }) {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  const dispatch = useDispatch();

  const dispatchProcess = (encrypt, msg, cipher) => {
    dispatch(process(encrypt, msg, cipher));
  };

  useEffect(() => {
    socket.on('message', (data) => {
      //decypt
      const ans = to_Decrypt(data.text, data.username);
      dispatchProcess(false, ans, data.text);
      let temp = messages;
      temp.push({
        userId: data.userId,
        username: data.username,
        date: data.date,
        text: ans,
        pic: data.pic,
      });
      setMessages([...temp]);
    });
  }, [socket]);

  const sendData = () => {
    if (text !== '') {
      //encrypt here
      const ans = to_Encrypt(text);
      socket.emit('chat', ans);
      setText('');
    }
  };
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className='chat'>
      <div className='header'>
        <img className='mainLogo' alt='Chatter' src={mainLogo} />
      </div>
      <div className='chatMessage'>
        {messages.map((message) => {
          if (message.username === username) {
            return (
              <div className='message messLeft'>
                <div className='massageArea'>
                  <img alt='avatar' src={`/images/${message.pic}.png`} />
                  <p>{message.text}</p>
                </div>
                <div className='messageDetails'>
                  <span>{message.username}</span>
                  <span>{moment(message.date).format('HH:mm')}</span>
                </div>
              </div>
            );
          } else {
            return (
              <div className='message messRight'>
                <div className='massageArea'>
                  <p>{message.text}</p>
                  <img alt='avatar' src={`/images/${message.pic}.png`} />
                </div>
                <div className='messageDetails'>
                  <span>{message.username}</span>
                  <span>{moment(message.date).format('HH:mm')}</span>
                </div>
              </div>
            );
          }
        })}
        <div ref={messagesEndRef} />
      </div>
      <div className='send'>
        <input
          placeholder='enter your message'
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              sendData();
            }
          }}
        ></input>
        <button onClick={sendData}>Send</button>
      </div>
    </div>
  );
}
export default Chat;
