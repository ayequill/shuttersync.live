import { Controller, Get } from '@nestjs/common';
import { Public } from '@/auth/skip-auth';

@Controller()
export class AppController {
  constructor() {}

  @Public()
  @Get('health')
  async checkHealth() {
    return 'Server is running';
  }
}
