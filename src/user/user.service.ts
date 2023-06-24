import { InjectRepository } from '@nestjs/typeorm'

import { CreateUserDto } from './dtos/createUser.dto'
import { UserEntity } from './interfaces/user.entity'

import { hash } from 'bcrypt'
import { Repository } from 'typeorm'

export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}
  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const saltOrRounds = 10
    const passwordHashed = await hash(createUserDto.password, saltOrRounds)

    return await this.userRepository.save({
      ...createUserDto,
      typeUser: 1,
      password: passwordHashed
    })
  }

  async getAllUser(): Promise<UserEntity[]> {
    this.userRepository.delete(
      (await this.userRepository.find()).map(item => item.id)
    )

    return this.userRepository.find()
  }
}
