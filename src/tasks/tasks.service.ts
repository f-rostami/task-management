import { Injectable } from '@nestjs/common';
import { ITask, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './DTOs/create-task.dto';
import { GetTaskFilterDto } from './DTOs/get-task-filter.dto';

@Injectable()
export class TasksService {
  private tasks: ITask[] = [];

  getAllTasks(): ITask[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTaskFilterDto): ITask[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter((x) => x.status === status);
    }
    if (search) {
      tasks = tasks.filter((x) =>
        x.title.includes(search) || x.description.includes(search)
          ? true
          : false,
      );
    }
    return tasks;
  }

  // createTask(title: string, description: string): ITask {
  createTask(createTaskDto: CreateTaskDto): ITask {
    const { title, description } = createTaskDto;

    const task: ITask = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  getTaskById(id: string): ITask {
    return this.tasks.find((x) => x.id === id);
  }

  deleteTaskById(id: string): void {
    this.tasks = this.tasks.filter((x) => x.id !== id);
  }

  updataTaskStatus(id: string, status: TaskStatus): ITask {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
