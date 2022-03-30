import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './DTOs/create-task.dto';
import { GetTaskFilterDto } from './DTOs/get-task-filter.dto';
import { ITask, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private _tasksSrvc: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTaskFilterDto): ITask[] {
    if (Object.keys(filterDto).length) {
      return this._tasksSrvc.getTasksWithFilters(filterDto);
    } else {
      return this._tasksSrvc.getAllTasks();
    }
  }

  // @Post()
  // createTask(@Body() body) {
  //   console.log('body', body);
  // }

  // @Post()
  // createTask(
  //   @Body('title') title: string,
  //   @Body('description') description: string,
  // ): ITask {
  //   return this._tasksSrvc.createTask(title, description);
  // }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): ITask {
    return this._tasksSrvc.createTask(createTaskDto);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): ITask {
    return this._tasksSrvc.getTaskById(id);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): void {
    this._tasksSrvc.deleteTaskById(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ) {
    return this._tasksSrvc.updataTaskStatus(id, status);
  }
}
