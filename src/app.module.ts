import { Module } from '@nestjs/common';
import { RepositoryModule } from './infrastructure/repository.module';
import { NodeController } from './presentation/controller/node.controller';
import { NewNodeCreator } from './domain/factory/new-node-creator';
import { StatusChecker } from './domain/domain-service/status-checker';
import { RegisterNodeUseCase } from './application/use-case/register-node.usecase';
import { GetAllNodesUseCase } from './application/use-case/get-all-nodes.usecase';
import { RebootNodeUseCase } from './application/use-case/reboot-node.usecase';
import { NodeOperator } from './domain/domain-service/node-operator';
import { BootNodeUseCase } from './application/use-case/boot-node.usecase';
import { ShutdownNodeUseCase } from './application/use-case/shutdown-node.usecase';
import { DeleteNodeUseCase } from './application/use-case/delete-node.usecase';
import { Scheduler } from './presentation/scheduler/scheduler';
import { ScheduleModule } from '@nestjs/schedule';
import { RebootAllUseCase } from './application/use-case/reboot-all-usecase';
import { Esp32Service } from './domain/domain-service/esp32.service';
import { LoggerService } from './domain/domain-service/logger';
import { ControllerController } from './presentation/controller/controller.controller';
import { NewControllerCreator } from './domain/factory/new-controller-creator';
import { ControllerOperator } from './domain/domain-service/controller-operator';
import { CheckWhatIsThisUseCase } from './application/use-case/check-what-is-this.usecase';
import { RegisterControllerUseCase } from './application/use-case/register-controller.usecase';
import { GetAllControllersUseCase } from './application/use-case/get-all-controllers.usecase';
import { ClientController } from './presentation/controller/client.controller';
import { GetAllClientsUseCase } from './application/use-case/get-all-clients.usecase';
import { RegisterClientUseCase } from './application/use-case/register-client.usecase';
import { NewClientCreator } from './domain/factory/new-client-creator';
import { DeleteControllerUseCase } from './application/use-case/delete-controller.usecase';
import { DeleteClientUseCase } from './application/use-case/delete-client.usecase';

@Module({
  imports: [RepositoryModule.register(), ScheduleModule.forRoot()],
  controllers: [NodeController, ControllerController, ClientController],
  providers: [
    // Entity Factory
    NewNodeCreator,
    NewControllerCreator,
    NewClientCreator,
    // Domain Service
    NodeOperator,
    StatusChecker,
    ControllerOperator,
    // ApplicationService
    RegisterNodeUseCase,
    GetAllNodesUseCase,
    GetAllControllersUseCase,
    GetAllClientsUseCase,
    RegisterClientUseCase,
    RebootNodeUseCase,
    BootNodeUseCase,
    ShutdownNodeUseCase,
    DeleteNodeUseCase,
    RebootAllUseCase,
    CheckWhatIsThisUseCase,
    RegisterControllerUseCase,
    DeleteControllerUseCase,
    DeleteClientUseCase,
    Esp32Service,
    Scheduler,
    LoggerService,
  ],
})
export class AppModule {}
