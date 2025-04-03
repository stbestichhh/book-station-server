import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { SqliteMockModule } from '../../database/sqlite.module.mock';
import { UserEntity } from '../../database';
import { CreateUserDto } from './dto';
import { UsersRepository } from './users.repository';

describe('UsersService', () => {
  let service: UsersService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SqliteMockModule, SqliteMockModule.forFeature([UserEntity])],
      providers: [UsersService, UsersRepository],
    }).compile();

    await UserEntity.sync({ force: true });

    service = module.get<UsersService>(UsersService);
  });

  afterAll(async () => {
    await UserEntity.drop();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Create users', () => {
    it('Should create user with not all attributes', async () => {
      const userData: CreateUserDto = {
        id: 'id1',
        username: 'test1',
        email: 'test@email.com',
        password: 'SomeStrongPassword123!',
      };

      const user = await service.createUser(userData);
      expect(user).toMatchObject({
        ...userData,
        dailyReadingGoal: 15,
        yearlyReadingGoal: 5,
      } as UserEntity);
    });

    it('Should create user with all attributes', async () => {
      const userData: CreateUserDto = {
        id: 'id2',
        username: 'test2',
        email: 'tes2@email.com',
        password: 'SomeStrongPassword123!',
        dailyReadingGoal: 5,
        yearlyReadingGoal: 1,
      };

      const user = await service.createUser(userData);
      expect(user).toMatchObject(userData);
    });

    it('Should throw if user with such email already exists', async () => {
      const userData: CreateUserDto = {
        id: 'id3',
        username: 'test3',
        email: 'test@email.com',
        password: 'SomeStrongPassword123!',
      };

      await expect(
        async () => await service.createUser(userData),
      ).rejects.toThrow();
    });
  });

  describe('Get users', () => {
    it('Should get all users', async () => {
      const users = await service.getAllUsers();
      expect(users).toHaveLength(2);
    });

    it('Should get user by id', async () => {
      const user = await service.getUser('id1');
      expect(user).toMatchObject({
        id: 'id1',
        username: 'test1',
        email: 'test@email.com',
        password: 'SomeStrongPassword123!',
        dailyReadingGoal: 15,
        yearlyReadingGoal: 5,
      });
    });

    it('Should throw if wrong id passed', async () => {
      await expect(
        async () => await service.getUser('somewrongid'),
      ).rejects.toThrow();
    });

    it('Should get user by where options', async () => {
      const [user] = await service.getAllUsers({ username: 'test1' });
      expect(user).toHaveProperty('username', 'test1');
    });
  });

  describe('Update user', () => {
    it('Should update user data', async () => {
      const user = await service.getUser('id1');
      const modifiedUser = await service.updateUser('id1', {
        yearlyReadingGoal: 15,
      });
      expect(user).not.toBe(modifiedUser);
      expect(user.yearlyReadingGoal).not.toEqual(
        modifiedUser.yearlyReadingGoal,
      );
      expect(modifiedUser).toHaveProperty('yearlyReadingGoal', 15);
    });
  });

  describe('Delete users', () => {
    it('Should delete user', async () => {
      await service.deleteUser('id1');
      const users = await service.getAllUsers();
      expect(users).toHaveLength(1);
    });

    it('Should throw because user does not exist', async () => {
      await expect(async () => await service.getUser('id1')).rejects.toThrow();
    });
  });
});
