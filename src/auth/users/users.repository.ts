import { AbstractRepository, UserEntity } from '../../database';
import { InjectModel } from '@nestjs/sequelize';

export class UsersRepository extends AbstractRepository<UserEntity> {
  constructor(
    @InjectModel(UserEntity) protected readonly model: typeof UserEntity,
  ) {
    super(model);
  }
}
