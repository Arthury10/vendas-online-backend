import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'

import { AddressService } from './address.service'
import { CreateAddressDto } from './dtos/createAddress.dto'
import { AddressEntity } from './entities/address.entity'

import { Roles } from 'src/decorators/roles.decorator'
import { UserId } from 'src/decorators/user-id.decorator'
import { UserType } from 'src/user/enum/user-type.enum'

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Roles(UserType.User)
  @Post()
  @UsePipes(ValidationPipe)
  async createAddress(
    @Body() createAddressDto: CreateAddressDto,
    @UserId() userId: number
  ): Promise<AddressEntity> {
    return this.addressService.createAddress(createAddressDto, userId)
  }
}
