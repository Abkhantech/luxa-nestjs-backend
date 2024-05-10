import { BadRequestException, createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';


export const CurrentUser = createParamDecorator((data: unknown, context: ExecutionContext):any => {
  try {
    const request = context.switchToHttp().getRequest<Request>();
    return request.user;
  } catch (e) {
    throw new BadRequestException(e.message);
  }
});
