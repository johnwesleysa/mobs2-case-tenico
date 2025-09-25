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

  // Novo teste para validar a geração de telemetria
  it('should generate and return the latest telemetry for a vehicle', () => {
    //forçando a geração de novos dados para o veículo de ID 1
    const generatedData = service.generateAndStoreTelemetry(1);

    //pegando os dados mais recentes para o mesmo veículo
    const latestData = service.getLatestTelemetry(1);

    //verifica se os dados retornados não são nulos
    expect(latestData).not.toBeNull();

    //verifica se os dados retornados são os mesmos que acabaram de ser gerados
    expect(latestData).toEqual(generatedData);

    //verifica se a estrutura dos dados está correta
    expect(latestData).toHaveProperty('vehicleId', 1);
    expect(latestData).toHaveProperty('latitude');
  });
});