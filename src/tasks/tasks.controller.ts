import { Controller, Get } from '@nestjs/common';
import { ITask } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private _tasksSrvc: TasksService) {}

  @Get()
  getAllTasks(): ITask[] {
    return this._tasksSrvc.getAllTasks();
  }
}
