import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('findDeleted')
  findAllDeleted() {
    return this.userService.findAllDeleted();
  }

  @Get('findOne/:id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Put('update/:id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: number) {
    return this.userService.remove(id);
  }

  @Get('export/:id')
  async exportUser(@Param('id') id: number, @Res() res: Response) {
    return this.userService.exportUserToExcel(id, res);
  }
}
