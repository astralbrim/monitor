import { INodeRepository } from '../../../domain/i-repository/i-node.repository';
import { NodeRepository } from './repositories/node.repository';
import { IControllerRepository } from '../../../domain/i-repository/i-controller.repository';
import { ControllerRepository } from './repositories/controller.repository';
import { IClientRepository } from '../../../domain/i-repository/i-client.repository';
import { ClientRepository } from './repositories/client.repository';

export default [
  {
    provide: INodeRepository,
    useClass: NodeRepository,
  },
  {
    provide: IControllerRepository,
    useClass: ControllerRepository,
  },
  {
    provide: IClientRepository,
    useClass: ClientRepository,
  },
];
