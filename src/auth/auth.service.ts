import { Injectable, NotFoundException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { LoginDto } from './dtos/login.dto'
import { LoginPayload } from './dtos/loginPayload.dto'
import { ReturnLogin } from './dtos/returnLogin.dto'

import { compare } from 'bcrypt'
import { ReturnUserDto } from 'src/user/dtos/returnUser.dto'
import { UserEntity } from 'src/user/entities/user.entity'
import { UserService } from 'src/user/user.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService
  ) {}

  async login(LoginDto: LoginDto): Promise<ReturnLogin> {
    const user: UserEntity = await this.userService
      .findUserByEmail(LoginDto.email)
      .catch(() => undefined)

    const isMatch = await compare(LoginDto.password, user?.password || '')

    if (!user || !isMatch) {
      throw new NotFoundException('Email or password invalid')
    }

    return {
      accessToken: this.jwtService.sign({ ...new LoginPayload(user) }),
      user: new ReturnUserDto(user)
    }
  }
}
