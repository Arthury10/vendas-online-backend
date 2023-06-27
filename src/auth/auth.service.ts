import { Injectable, NotFoundException } from '@nestjs/common'

import { LoginDto } from './dtos/login.dto'

import { compare } from 'bcrypt'
import { UserEntity } from 'src/user/entities/user.entity'
import { UserService } from 'src/user/user.service'

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async login(LoginDto: LoginDto): Promise<UserEntity> {
    const user: UserEntity = await this.userService
      .findUserByEmail(LoginDto.email)
      .catch(() => undefined)

    const isMatch = await compare(LoginDto.password, user?.password || '')

    if (!user || !isMatch) {
      throw new NotFoundException('Email or password invalid')
    }

    return user
  }
}
