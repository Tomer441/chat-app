import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor() {
    this.logger.log('MongoDB connection established'); // Log a message after the MongoDB connection is established
  }

  getHello(): string {
    return 'Hello World!';
  }
}
