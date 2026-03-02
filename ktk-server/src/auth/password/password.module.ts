import { Module } from '@nestjs/common';
import { PasswordService } from './password.service';
import { PasswordController } from './password.controller';
import { MailModule } from '@/libs/mail/mail.module';
import { UsersModule } from '@/users/users.module';

@Module({
  imports: [UsersModule, MailModule],
  controllers: [PasswordController],
  providers: [PasswordService],
})
export class PasswordModule {}
