import { Test, TestingModule } from '@nestjs/testing';
import { TelemetriaGateway } from './telemetria.gateway';

describe('TelemetriaGateway', () => {
  let gateway: TelemetriaGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TelemetriaGateway],
    }).compile();

    gateway = module.get<TelemetriaGateway>(TelemetriaGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
