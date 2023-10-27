import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  WebSocketServer,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket, ...args: any[]) {
    const { userId, userType } = args[0]; 
    client.join(`${userType}-${userId}`); 
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    // Hapus klien dari room (jika perlu)
    console.log(`Client disconnected: ${client.id}`);
  }
}
