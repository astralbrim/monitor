import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { GetAllNodesUseCase } from '../../application/use-case/get-all-nodes.usecase';
import {
  GetAllNodesResponseDto,
  RegisterNodeDto,
} from './node.controller.dtos';
import { RebootNodeUseCase } from '../../application/use-case/reboot-node.usecase';
import { OperateNodeCommand } from '../../application/use-case/commands/operate-node.command';
import { RegisterNodeUseCase } from '../../application/use-case/register-node.usecase';
import { RegisterNodeCommand } from '../../application/use-case/commands/register-node..command';
import { BootNodeUseCase } from '../../application/use-case/boot-node.usecase';
import { ShutdownNodeUseCase } from '../../application/use-case/shutdown-node.usecase';
import { DeleteNodeUseCase } from '../../application/use-case/delete-node.usecase';
import { RebootAllUseCase } from '../../application/use-case/reboot-all-usecase';

@Controller('node')
export class NodeController {
  constructor(
    private readonly getAllNodesUseCase: GetAllNodesUseCase,
    private readonly rebootNodeUseCase: RebootNodeUseCase,
    private readonly registerNodeUseCase: RegisterNodeUseCase,
    private readonly bootNodeUseCase: BootNodeUseCase,
    private readonly shutdownNodeUseCase: ShutdownNodeUseCase,
    private readonly deleteNodeUseCase: DeleteNodeUseCase,
    private readonly rebootAllUseCase: RebootAllUseCase,
  ) {}

  @Get()
  async getAll(): Promise<GetAllNodesResponseDto> {
    const nodes = await this.getAllNodesUseCase.handle();
    return new GetAllNodesResponseDto(nodes);
  }

  @Delete('/:id')
  async deleteOne(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.deleteNodeUseCase.handle(id);
  }

  @Get('/reboot/:id')
  async reboot(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.rebootNodeUseCase.handle(new OperateNodeCommand(id));
  }

  @Get('/boot/:id')
  async boot(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.bootNodeUseCase.handle(new OperateNodeCommand(id));
  }

  @Get('/shutdown/:id')
  async shutdown(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.shutdownNodeUseCase.handle(new OperateNodeCommand(id));
  }

  @Get('/reboot')
  async rebootAll(): Promise<void> {
    await this.rebootAllUseCase.handle();
  }

  @Post()
  async register(@Body() dto: RegisterNodeDto): Promise<void> {
    await this.registerNodeUseCase.handle(
      new RegisterNodeCommand(dto.name, dto.controllerId, dto.clientId),
    );
  }
}
