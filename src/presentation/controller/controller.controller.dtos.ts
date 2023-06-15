import { ApiProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { ControllerStatus } from '../../domain/domain-object/value-object/status';
import { Controller } from '../../domain/domain-object/entity/controller';

export class RegisterControllerDto {
  @ApiProperty()
  ipAddress: string;
}

export class GetAllControllersResponseDto {
  statusCode = HttpStatus.OK;
  controllers: {
    id: number;
    ipAddress: string;
    status: ControllerStatus;
    isBelongNode: boolean;
  }[];
  constructor(_controllers: Controller[]) {
    this.controllers = _controllers.map((controller) => {
      return {
        id: controller.id,
        ipAddress: controller.ipAddress.value,
        status: controller.status,
        isBelongNode: controller.isBelongNode,
      };
    });
  }
}
