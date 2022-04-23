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
    try {
      const { title, description } = createTaskDto;
      const task = this.taskRepository.create({ title, description });
      await this.taskRepository.save(task);
      return task;
    } catch (error) {
      throw new ConflictException({ error });
    }
  }

  async getTasks(): Promise<Task[]> {
    try {
      const tasks = await this.taskRepository.find();
      return tasks;
    } catch (error) {
      throw new ConflictException({ error });
    }
  }

  async getTask(id: string): Promise<Task> {
    try {
      const task = await this.taskRepository.findOne(id);
      return task;
    } catch (error) {
      throw new ConflictException({ error });
    }
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    try {
      const { title, description } = updateTaskDto;
      const task = await this.getTask(id);

      if (task) {
        task.title = title;
        task.description = description;
      }

      await this.taskRepository.save(task);
      return task;
    } catch (error) {
      throw new ConflictException({ error });
    }
  }

  async deleteTask(id: string): Promise<Task> {
    try {
      const task = await this.getTask(id);
      await this.taskRepository.delete(id);
      return task;
    } catch (error) {
      throw new ConflictException({ error });
    }
  }
}
