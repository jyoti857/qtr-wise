import {createParamDecorator, ExecutionContext} from '@nestjs/common'
import {CreateUserResponse} from '../users/dto/create-user-dto'
const getCurrentUserByContext = (context: ExecutionContext) => {
  return context.switchToHttp().getRequest().user;
}

export const CurrentUser = createParamDecorator((_data: unknown, context: ExecutionContext
  ):CreateUserResponse => getCurrentUserByContext(context)
)