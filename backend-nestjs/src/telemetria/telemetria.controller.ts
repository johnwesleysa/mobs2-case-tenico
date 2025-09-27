import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { TelemetriaService } from './telemetria.service'; // Nome do serviço corrigido

@Controller('telemetry') // O endpoint continua o mesmo
export class TelemetriaController {
  constructor(private readonly telemetriaService: TelemetriaService) {} // Nome da classe e variável corrigidos

  @Get(':vehicleId')
  getLatest(@Param('vehicleId') vehicleId: string) {
    const latestData = this.telemetriaService.getLatestTelemetry(Number(vehicleId));
    if (!latestData) {
      throw new NotFoundException('No telemetry data found for this vehicle.');
    }
    return latestData;
  }

  @Get(':vehicleId/history')
  getHistory(@Param('vehicleId') vehicleId: string) {
    return this.telemetriaService.getHistory(Number(vehicleId));
  }
}