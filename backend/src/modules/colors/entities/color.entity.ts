import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('colors')
export class Color {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 80, unique: true })
  name: string;

  @Column({ type: 'char', length: 7 })
  hex_code: string;
}
