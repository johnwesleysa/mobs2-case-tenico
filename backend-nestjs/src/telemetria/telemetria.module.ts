import { Module } from '@nestjs/common';
import { TelemetriaController } from './telemetria.controller';
import { TelemetriaService } from './telemetria.service';
import { TelemetriaGateway } from './telemetria.gateway';

@Module({
  controllers: [TelemetriaController],
  providers: [TelemetriaService, TelemetriaGateway]
})
export class TelemetriaModule {}
