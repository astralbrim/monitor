import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { RegisterControllerUseCase } from '../../application/use-case/register-controller.usecase';
import {
  GetAllControllersResponseDto,
  RegisterControllerDto,
} from './controller.controller.dtos';
import { RegisterControllerCommand } from '../../application/use-case/commands/register-controller.command';
import { CheckWhatIsThisUseCase } from '../../application/use-case/check-what-is-this.usecase';
import { GetAllControllersUseCase } from '../../application/use-case/get-all-controllers.usecase';
import { DeleteControllerUseCase } from '../../application/use-case/delete-controller.usecase';

@Controller('controller')
export class ControllerController {
  constructor(
    private readonly registerControllerUseCase: RegisterControllerUseCase,
    private readonly getAllControllersUseCase: GetAllControllersUseCase,
    private readonly checkWhatIsThisUseCase: CheckWhatIsThisUseCase,
    private readonly deleteControllerUseCase: DeleteControllerUseCase,
  ) {}

  @Post()
  async register(@Body() dto: RegisterControllerDto): Promise<void> {
    await this.registerControllerUseCase.handle(
      new RegisterControllerCommand(dto.ipAddress),
    );
  }

  @Get()
  async getAll(): Promise<GetAllControllersResponseDto> {
    const controllers = await this.getAllControllersUseCase.handle();
    return new GetAllControllersResponseDto(controllers);
  }

  @Get('/check/:id')
  async checkWhatIsThis(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.checkWhatIsThisUseCase.handle(id);
  }

  @Delete('/:id')
  async deleteOne(@Param('id', ParseIntPipe) id: number) {
    await this.deleteControllerUseCase.handle(id);
  }
}
