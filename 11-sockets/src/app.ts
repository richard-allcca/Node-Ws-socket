import { WebSocket, WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', ws => {
  // Log a new client connection
  console.log('Client connected');

  // Envía un mensaje al cliente cuando se conecta
  ws.send('Hello! Message From Server!!');

  ws.on('error', console.error)

  // Escucha los mensajes del cliente
  ws.on('message', message => {
    console.log(`Received message => ${message}`);

    const payload = {
      type: 'message',
      data: message.toString()
    }

    // Envía un mensaje de vuelta a todos los clientes conectados

    // wss.clients.forEach(client => {
    //   if (client.readyState === WebSocket.OPEN) {
    //     client.send(JSON.stringify(payload), { binary: false });
    //   }
    // });

    // Enviar mensaje todos menos al que lo envió

    wss.clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(payload), { binary: false });
      }
    });

  });

  // Envía mensajes al cliente cada 2 segundos
  // setInterval(() => {
  //   ws.send('Hello! Message From Server!!');
  // }, 2000);

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});


console.log('Server started on port 3000');