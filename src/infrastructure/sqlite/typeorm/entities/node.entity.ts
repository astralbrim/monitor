import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Client } from './client.entity';
import { Controller } from './controller.entity';

@Entity()
export class Node {
  @PrimaryColumn({ comment: 'id' })
  id: number;

  @Column({ comment: 'name' })
  name: string;

  @OneToOne(() => Client, (client) => client.node, {
    cascade: true,
  })
  @JoinColumn()
  client: Client;

  @OneToOne(() => Controller, (controller) => controller.node, {
    cascade: true,
  })
  @JoinColumn()
  controller: Controller;

  public static create(id: number, name: string): Node {
    const newInstance = new this();
    newInstance.id = id;
    newInstance.name = name;
    return newInstance;
  }
}
