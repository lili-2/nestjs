import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository, Connection, getRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm'
import { UsersEntity } from './users.entity';
import { use } from 'passport';
import { encryptPassword } from 'src/utils/cryptogram';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
    private connection: Connection,
  ) {}

  async findAll(): Promise<UsersEntity[]> {
    // relations: ['photos']， 联合查询
    return await this.usersRepository.find({ relations: ['articles'] });
    // return await this.usersRepository.find();
    
    // 或者使用queryBuilder
    // return await getRepository(UsersEntity)
    //   .createQueryBuilder("user")
    //   .leftJoinAndSelect("user.photos", "photo")
    //   .getMany()
  }

  // 查询
  async findOne(username: string):Promise<any | undefined>{
    const u = await getRepository(UsersEntity).findOne({ where: { username } });
    return u;
  }

  async create(user): Promise<UsersEntity[]> {
    const { username } = user;
    // const u = await getRepository(UsersEntity).findOne({ where: { username } });

    const u = await this.findOne(username);

    //   .createQueryBuilder('users')
    //   .where('users.name = :name', { name });
    // const u = await qb.getOne();
    if (u) {
      throw new HttpException(
        {
          message: '创建失败',
          error: 'name必须唯一',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    console.log(user)
    return await this.usersRepository.save(user);
  }

  // 注册
  async register(requestBody): Promise<any>{
    console.log('user service register')
    let {username,password} = requestBody;
    const u = await this.findOne(username);
    if(u){
      return {
        code: 400,
        msg: '用户名已被使用'
      }
    }
    password = encryptPassword(password,'userSalt');
    try {
      await this.usersRepository.save({username,password});
      return {
        code: 200,
        msg: 'Success'
      }
    } catch (e) {
      return {
        code: 500,
        msg: `Server error : ${e};
        }`
      }
    }

  }
  // async createMany(users: UsersEntity[]) {
  //   const queryRunner = this.connection.createQueryRunner();

  //   await queryRunner.connect();
  //   await queryRunner.startTransaction();
  //   try {
  //     users.forEach(async user => {
  //       await queryRunner.manager.getRepository(UsersEntity).save(user);
  //     });

  //     await queryRunner.commitTransaction();
  //   } catch (err) {
  //     // since we have errors lets rollback the changes we made
  //     await queryRunner.rollbackTransaction();
  //   } finally {
  //     // you need to release a queryRunner which was manually instantiated
  //     await queryRunner.release();
  //   }
  // }
}
