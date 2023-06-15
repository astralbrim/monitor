import { ApiProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { ClientStatus } from '../../domain/domain-object/value-object/status';
import { Client } from '../../domain/domain-object/entity/client';

export class RegisterClientDto {
  @ApiProperty()
  ipAddress: string;
}

export class GetAllClientsResponseDto {
  statusCode = HttpStatus.OK;
  clients: {
    id: number;
    ipAddress: string;
    status: ClientStatus;
    isBelongNode: boolean;
  }[];
  constructor(_clients: Client[]) {
    this.clients = _clients.map((client) => {
      return {
        id: client.id,
        ipAddress: client.ipAddress.value,
        status: client.status,
        isBelongNode: client.isBelongNode,
      };
    });
  }
}
