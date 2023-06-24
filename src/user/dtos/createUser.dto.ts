import { IsString } from 'class-validator'

export class CreateUserDto {
  @IsString()
  email: string

  @IsString()
  name: string

  @IsString()
  cpf: string

  @IsString()
  phone: string

  @IsString()
  password: string
}
