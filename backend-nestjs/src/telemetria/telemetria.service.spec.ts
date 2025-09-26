import { Test, TestingModule } from '@nestjs/testing';
import { TelemetriaService } from './telemetria.service';

describe('TelemetriaService', () => {
  let service: TelemetriaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TelemetriaService],
    }).compile();

    service = module.get<TelemetriaService>(TelemetriaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate and return the latest telemetry for a vehicle', () => {
    (service as any).telemetryHistory[1] = [];

    const generatedData = service.generateAndStoreTelemetry(1);
    const latestData = service.getLatestTelemetry(1);

    expect(latestData).not.toBeNull();
    expect(latestData).toEqual(generatedData);
    expect(latestData).toHaveProperty('vehicleId', 1);
    expect(latestData).toHaveProperty('latitude');
  });
});