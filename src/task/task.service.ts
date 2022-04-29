import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.taskRepository.create({ title, description });
    await this.taskRepository.save(task);
    return task;
  }

  async getTasks(): Promise<Task[]> {
    const tasks = await this.taskRepository.find();
    return tasks;
  }

  async getTask(id: string): Promise<Task> {
    const task = await this.taskRepository.findOne(id);

    if (task) {
      return task;
    }

    throw new NotFoundException(`Task with id "${id}" not found`);
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const { title, description } = updateTaskDto;
    const task = await this.getTask(id);

    if (task) {
      task.title = title;
      task.description = description;
      await this.taskRepository.save(task);
      return task;
    }

    throw new NotFoundException(`Task with id "${id}" not found`);
  }

  async deleteTask(id: string): Promise<Task> {
    const task = await this.getTask(id);

    if (task) {
      await this.taskRepository.delete(id);
      return task;
    }

    throw new NotFoundException(`Task with id "${id}" not found`);
  }
}
