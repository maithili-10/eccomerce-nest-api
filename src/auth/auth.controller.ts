import { Controller, Post ,Body, HttpCode, UseGuards, Get, Request} from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto/login.dto';
import { JwtAuthGuard } from './jwt.guard';
import { UserService } from './user/user.service';


@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService,
        private userService:UserService
        ){}

    @Post('login')
    @HttpCode(200)
    @ApiCreatedResponse({description:"User Logged in Successfully "})
    @ApiBadRequestResponse({description:"User does not exist or Invalid login details"})
    login(@Body() loginDto:LoginDto){
        return this.authService.login(loginDto)
    }

    @Post('register')
    @ApiCreatedResponse({description:"User Successfully created"})
    @ApiBadRequestResponse({description:"User already exists or server error"})
    register(@Body() createUserDto:CreateUserDto){
    return this.authService.registerUser(createUserDto)
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
      return this.userService.findById(req.user.userId);
    }
}
