import { MiddlewareFn } from "type-graphql";
import { AppHeaderContext } from "../plugins/buildAppHeaderContext";

const authUser: MiddlewareFn<AppHeaderContext> = ({ context }, next) => {
  const userContext = context.userContext

  if (!userContext?.id) {
    throw new Error('Missing id on header!')
  }

  if (!userContext?.username) {
    throw new Error('Missing username on header!')
  }

  if (!userContext?.id && !userContext?.username) {
    throw new Error('Unauthenticated user')
  }

  return next()
}

export default authUser;