import { Node } from '../domain/domain-object/entity/node';
import {
  ClientStatus,
  ControllerStatus,
} from '../domain/domain-object/value-object/status';

export class CanOperate {
  public static reboot(node: Node) {
    return node.controller.status == ControllerStatus.OK;
  }

  public static boot(node: Node) {
    return (
      node.controller.status == ControllerStatus.OK &&
      node.client.status == ClientStatus.MAINTENANCE
    );
  }

  public static shutdown(node: Node) {
    return (
      node.controller.status == ControllerStatus.OK &&
      node.client.status != ClientStatus.MAINTENANCE
    );
  }
}
