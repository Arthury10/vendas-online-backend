import { Body, Controller, Post } from '@nestjs/common'
import { CreateUserDto } from './dtos/createUser.dto'

@Controller('user')
export class UserController {
  @Post()
  async createUser(@Body() createUser: CreateUserDto) {
    console.log('teste')
    return {
      ...createUser,
      password: undefined
    }
  }
}
