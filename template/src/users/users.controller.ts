import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Get() findAll() { return this.users.findAll(); }
  @Get(':id') findOne(@Param('id', ParseIntPipe) id: number) { return this.users.findOne(id); }
  @Post() create(@Body() dto: CreateUserDto) { return this.users.create(dto); }
  @Delete(':id') @HttpCode(204) remove(@Param('id', ParseIntPipe) id: number) { this.users.remove(id); }
}
