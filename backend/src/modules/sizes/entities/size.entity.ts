import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('sizes')
@Unique(['region', 'value'])
export class Size {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 10 })
  region: string;

  @Column({ type: 'numeric', precision: 4, scale: 1 })
  value: number;

  @Column({ type: 'varchar', length: 20 })
  display_label: string;
}
