import { Column, Entity, JoinTable, OneToOne, PrimaryColumn } from 'typeorm';
import { ClientStatus } from '../../../../domain/domain-object/value-object/status';
import { Node } from './node.entity';

@Entity()
export class Client {
  @PrimaryColumn()
  id: number;

  @Column({ unique: true })
  ipAddress: string;

  @Column()
  status: ClientStatus;

  @OneToOne(() => Node, (node) => node.client)
  @JoinTable()
  node: Node;

  public static create(
    id: number,
    ipAddress: string,
    status: ClientStatus,
  ): Client {
    const newInstance = new this();
    newInstance.id = id;
    newInstance.ipAddress = ipAddress;
    newInstance.status = status;

    return newInstance;
  }
}
