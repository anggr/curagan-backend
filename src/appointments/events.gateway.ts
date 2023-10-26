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
     console.log(`Client connected: ${client.id}`);
   }
 
   handleDisconnect(client: Socket) {
     console.log(`Client disconnected: ${client.id}`);
   }
 
   @SubscribeMessage('appointmentStatus')
   handleEvent(client: Socket, data: any): string {
     return 'Hello world!';
   }
 }
 