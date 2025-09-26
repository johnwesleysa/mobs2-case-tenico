import { Test, TestingModule } from '@nestjs/testing';
import { TelemetriaController } from './telemetria.controller';
import { TelemetriaService } from './telemetria.service';

describe('TelemetriaController', () => {
  let controller: TelemetriaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TelemetriaController],
      providers: [TelemetriaService]
    }).compile();

    controller = module.get<TelemetriaController>(TelemetriaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
