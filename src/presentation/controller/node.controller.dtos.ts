import { HttpStatus } from '@nestjs/common';
import { Node } from '../../domain/domain-object/entity/node';
import { ApiProperty } from '@nestjs/swagger';
import {
  ClientStatus,
  ControllerStatus,
} from '../../domain/domain-object/value-object/status';

export class GetAllNodesResponseDto {
  statusCode = HttpStatus.OK;
  nodes: {
    id: number;
    name: string;
    controllerStatus: ControllerStatus;
    clientStatus: ClientStatus;
  }[];

  constructor(_nodes: Node[]) {
    this.nodes = _nodes.map((node) => {
      return {
        id: node.id,
        name: node.name.value,
        clientStatus: node.client.status,
        controllerStatus: node.controller.status,
      };
    });
  }
}

export class RegisterNodeDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  controllerId: number;
  @ApiProperty()
  clientId: number;
}
