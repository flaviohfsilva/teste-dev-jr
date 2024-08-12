import { User } from 'src/core/entities/User.entity';
import { DataSource } from 'typeorm';

// Criação do repositório do usuário
export const userProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
];
