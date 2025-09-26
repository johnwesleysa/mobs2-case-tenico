import { Test, TestingModule } from '@nestjs/testing';
import { TelemetriaGateway } from './telemetria.gateway';
import { TelemetriaService } from './telemetria.service';

describe('TelemetriaGateway', () => {
  let gateway: TelemetriaGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TelemetriaGateway, TelemetriaService],
    }).compile();

    gateway = module.get<TelemetriaGateway>(TelemetriaGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
