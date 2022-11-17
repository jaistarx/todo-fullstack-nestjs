import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ListService } from './list.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { UserService } from 'src/user/user.service';

@Controller('list')
export class ListController {
  constructor(
    private readonly listService: ListService,
    private readonly userService: UserService,
  ) {}

  @Post()
  async create(@Body() createListDto: CreateListDto) {
    const userDetails = await this.userService.findOne(createListDto.user);
    return this.listService.create(createListDto, userDetails);
  }

  @Get()
  findAll() {
    return this.listService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.listService.findOne(+id);
  }

  @Get('user/:userId')
  async findUserItems(@Param('userId') userId: number) {
    const user = await this.userService.findOne(userId);
    return this.listService.findUserItems(user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateListDto: UpdateListDto) {
    return this.listService.update(+id, updateListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listService.remove(+id);
  }
}
