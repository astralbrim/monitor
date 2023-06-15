import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import {
  GetAllClientsResponseDto,
  RegisterClientDto,
} from './client.controller.dtos';
import { GetAllClientsUseCase } from '../../application/use-case/get-all-clients.usecase';
import { RegisterClientUseCase } from '../../application/use-case/register-client.usecase';
import { RegisterClientCommand } from '../../application/use-case/commands/register-client.command';
import { DeleteClientUseCase } from '../../application/use-case/delete-client.usecase';

@Controller('client')
export class ClientController {
  constructor(
    private readonly getAllClientsUseCase: GetAllClientsUseCase,
    private readonly registerClientUseCase: RegisterClientUseCase,
    private readonly deleteClientUseCase: DeleteClientUseCase,
  ) {}

  @Get()
  async getAll(): Promise<GetAllClientsResponseDto> {
    const clients = await this.getAllClientsUseCase.handle();
    return new GetAllClientsResponseDto(clients);
  }

  @Post()
  async register(@Body() dto: RegisterClientDto) {
    console.log(dto);
    await this.registerClientUseCase.handle(
      new RegisterClientCommand(dto.ipAddress),
    );
  }

  @Delete('/:id')
  async deleteOne(@Param('id', ParseIntPipe) id: number) {
    await this.deleteClientUseCase.handle(id);
  }
}
