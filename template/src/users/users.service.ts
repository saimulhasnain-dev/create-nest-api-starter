import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';

export interface User extends CreateUserDto { id: number }

// In-memory on purpose: swap for TypeORM/Prisma when you add a database.
@Injectable()
export class UsersService {
  private users: User[] = [];
  private nextId = 1;

  findAll() { return this.users; }

  findOne(id: number) {
    const user = this.users.find((u) => u.id === id);
    if (!user) throw new NotFoundException(`User ${id} not found`);
    return user;
  }

  create(dto: CreateUserDto) {
    if (this.users.some((u) => u.email === dto.email)) throw new ConflictException('Email already registered');
    const user = { id: this.nextId++, ...dto };
    this.users.push(user);
    return user;
  }

  remove(id: number) {
    this.findOne(id);
    this.users = this.users.filter((u) => u.id !== id);
  }
}
