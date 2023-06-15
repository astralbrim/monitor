import { Check, Entity, PrimaryColumn } from 'typeorm';

@Entity()
@Check(`ensure = 1`)
export class SettingEntity {
  @PrimaryColumn({ type: 'int', default: () => `1`, nullable: false })
  ensure: 1;
}
