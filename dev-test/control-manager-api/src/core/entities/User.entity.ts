import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user', { schema: 'control_manager' })
export class User {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'nome', length: 255 })
  nomeCompleto: string;

  @Column('varchar', { name: 'email', length: 255 })
  email: string;

  @Column('varchar', { name: 'status', length: 255 })
  status: string;

  @Column('tinyint', { name: 'excluido', width: 1, default: () => "'0'" })
  excluido: boolean;
}
