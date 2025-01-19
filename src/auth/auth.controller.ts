import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from './entities/user.entity';
import { RawHeaders, GetUser, RoleProtected, Auth } from './decorators';
import { UserRoleGuard } from './guards/use-role/use-role.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('check-status')
  @Auth()
  checkAuthStatus(@GetUser() user: User) {
    return this.authService.checkAuthStatus(user);
  }

  @Get('private')
  // This route is protected by the AuthGuard
  @UseGuards(AuthGuard())
  testingPrivateRoute(
    //@Req() request: Express.Request
    @GetUser() user: User,
    @GetUser('email') email: string,
    @RawHeaders() headers: string[],
  ) {
    console.log(email);
    console.log(headers);
    return {
      message: 'This is a private route',
      user,
    };
  }

  @Get('private2')
  //@SetMetadata('roles', ['admin'])
  @RoleProtected()
  @UseGuards(AuthGuard(), UserRoleGuard)
  privateRoute2(@GetUser() user: User) {
    return {
      message: 'This is a private route',
      user,
    };
  }

  @Get('private3')
  @Auth()
  privateRoute3(@GetUser() user: User) {
    return {
      message: 'This is a private route',
      user,
    };
  }
}
