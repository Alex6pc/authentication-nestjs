import {
  Resolver,
  Query,
  Mutation,
  Args,
  Context
} from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import type { Request } from 'express'
import type { User } from '@prisma/client'
import { User as UserModel } from '../models/user.model'
import { AuthService } from './auth.service'
import { AuthGuard } from '../guards/auth.guard'
import { CreateUserDto } from './dto/createUser.dto'
import { SigninDto } from './dto/signin.dto'

@Resolver(() => UserModel)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => [UserModel])
  allUsers(): Promise<User[]> {
    return this.authService.getAllUsers()
  }

  @Mutation(() => UserModel)
  createUser(@Args('data') data: CreateUserDto): Promise<User> {
    return this.authService.createUser(data)
  }

  @Mutation(() => UserModel)
  async signin(
    @Args('data') data: SigninDto,
    @Context('req') req: Request
  ): Promise<User> {
    const { user, token } = await this.authService.signin(data)
    req.res?.cookie('jwt', token, { httpOnly: true })
    return user
  }

  @Mutation(() => UserModel)
  async signOut(
    @Context('req') req: Request,
    @Context('user') user: User
  ): Promise<User> {
    req.res?.clearCookie('jwt', { httpOnly: true })
    return user
  }

  @UseGuards(AuthGuard)
  @Query(() => UserModel)
  async me(@Context('user') user: User): Promise<User> {
    return user
  }
}