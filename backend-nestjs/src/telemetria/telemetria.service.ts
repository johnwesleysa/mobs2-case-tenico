// telemetria.service.ts

import { Injectable, OnModuleInit } from '@nestjs/common';

// Mova a interface para cá também
export interface TelemetriaData {
  vehicleId: number;
  latitude: number;
  longitude: number;
  speed: number;
  fuel: number;
  updatedAt: string;
}

@Injectable()
export class TelemetriaService implements OnModuleInit { // Nome da classe com 'T' maiúsculo
  private telemetryHistory: Record<number, TelemetriaData[]> = {};
  private vehicleIds = [1, 2];

  onModuleInit() {
    this.vehicleIds.forEach((id) => {
      this.telemetryHistory[id] = [];
      this.generateAndStoreTelemetry(id);
    });

    setInterval(() => {
      this.vehicleIds.forEach((id) => this.generateAndStoreTelemetry(id));
    }, 5000);
  }

  generateAndStoreTelemetry(vehicleId: number): TelemetriaData {
    const newTelemetry: TelemetriaData = {
      vehicleId,
      latitude: -23.5505 + (Math.random() - 0.5) * 0.1,
      longitude: -46.6333 + (Math.random() - 0.5) * 0.1,
      speed: Math.floor(Math.random() * 120),
      fuel: Math.floor(Math.random() * 100),
      updatedAt: new Date().toISOString(),
    };

    this.telemetryHistory[vehicleId].push(newTelemetry);

    if (this.telemetryHistory[vehicleId].length > 100) {
      this.telemetryHistory[vehicleId].shift();
    }

    return newTelemetry;
  }

  getLatestTelemetry(vehicleId: number): TelemetriaData | null {
    const history = this.telemetryHistory[vehicleId];
    if (!history || history.length === 0) {
      return null;
    }
    return history[history.length - 1];
  }

  getHistory(vehicleId: number): TelemetriaData[] {
    return this.telemetryHistory[vehicleId] || [];
  }
}