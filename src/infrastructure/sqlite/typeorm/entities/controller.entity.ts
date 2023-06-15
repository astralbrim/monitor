import { Column, Entity, JoinTable, OneToOne, PrimaryColumn } from 'typeorm';
import { ControllerStatus } from '../../../../domain/domain-object/value-object/status';
import { Node } from './node.entity';

@Entity()
export class Controller {
  @PrimaryColumn()
  id: number;

  @Column({ unique: true })
  ipAddress: string;

  @Column()
  status: ControllerStatus;

  @OneToOne(() => Node, (node) => node.controller)
  @JoinTable()
  node: Node;

  public static create(
    id: number,
    ipAddress: string,
    status: ControllerStatus,
  ): Controller {
    const newInstance = new this();
    newInstance.id = id;
    newInstance.status = status;
    newInstance.ipAddress = ipAddress;
    return newInstance;
  }
}
