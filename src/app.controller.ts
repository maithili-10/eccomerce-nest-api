import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Query('name') name:string,@Query('email') email:string): string {
    console.log(name,email)
    return this.appService.getHello();
  }
  @Post()
  postFunction(@Body() data:any){
    console.log(data);
  return 'post method function'
  }
  @Put(':id')
  putFunction(@Param('id') id:string ,@Body() data:any){
    console.log(id,data)
    return 'Put function'
  }
  @Delete(':id')
  deleteFunction(@Param('id') testid:string){
    console.log(testid)
    return 'Delete function'
  }
}
