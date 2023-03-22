import React, { useEffect, useState } from 'react';
import { ActivationState, Client, StompSubscription } from '@stomp/stompjs';
import './App.css';
const App = () => {

  const [color, setColor] = useState('grey');
  const [state, setState] = useState('d');
  const [stompSub, setStompSub] = useState<StompSubscription>();

  let onConnect = () => {
    console.log('Successfully connected !!');
    let subc = client.subscribe('/topic/color', (msg) => {
      if (msg.body) {
        let body = JSON.parse(msg.body);
        if (body) {
          setColor(body.color);
        }
      }
    })
    setStompSub(subc);
    setState('c');
  }

  let onDisconnect = () => {
    console.log('Disconnected');
    setState('d');
  }

  const client = new Client({
    brokerURL: 'ws://localhost:8080/ws-message',
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
    onConnect: onConnect,
    onDisconnect: onDisconnect
  });

  return (
    <div className="App">

      <div className='Container'>
        <button
          style={{
            width: '100px',
            height: '30px'
          }}
          onClick={() => {
            if (state === 'd') {
              client.activate();
            } else {
              stompSub?.unsubscribe();
              client.forceDisconnect();
              client.deactivate().then((() => {
                setState('d');
              })).catch(err => {
                console.log(err);
              })
            }
          }}>{state === 'c' ? 'Disconnect' : 'Connect'}</button>
        
        <h4>Color: {color}</h4>
        <div style={{
          width: '200px',
          height: '200px',
          backgroundColor: color
        }}>

        </div>
      </div>



    </div>
  );
}

export default App;
