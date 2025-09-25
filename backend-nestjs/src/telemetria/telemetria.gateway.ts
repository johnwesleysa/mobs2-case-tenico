import {
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { TelemetriaService } from './telemetria.service';
import { OnModuleInit } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*', // Em produção, restrinja para o domínio do seu frontend
  },
  namespace: '/telemetry', // Opcional, para organizar os sockets
})
export class TelemetryGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  constructor(private readonly telemetryService: TelemetriaService) {}

  // Assim que o módulo iniciar, começamos a enviar os dados
  onModuleInit() {
    setInterval(() => {
      const vehicleIds = [1, 2]; // Mesmos IDs do serviço
      vehicleIds.forEach(id => {
        const latestData = this.telemetryService.getLatestTelemetry(id);
        if (latestData) {
          // Emite um evento 'telemetryUpdate' com os dados mais recentes
          this.server.emit('telemetryUpdate', latestData);
        }
      });
    }, 5000); // Sincronizado com o intervalo de geração do serviço
  }
}