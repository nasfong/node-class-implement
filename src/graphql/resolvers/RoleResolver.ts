import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { ListRoleResponse, Role, RoleFilterInput } from "../../entities/RoleEntity";
import { RoleService } from "../../services/RoleService";
import { PagerInput } from "../typeDefs/paginationTypeDef";
import { AppHeaderContext } from "../plugins/buildAppHeaderContext";
import authUser from "../middleware/authUser";

@Resolver(Role)
export class RoleResolver {
  private roleService = new RoleService()

  @UseMiddleware(authUser)
  @Query(() => ListRoleResponse, { nullable: true })
  async roles(
    @Ctx() context: AppHeaderContext,
    @Arg('pager', { nullable: true }) pager: PagerInput,
    @Arg('filter', { nullable: true }) filter: RoleFilterInput
  ) {
    console.log(context.userContext)
    return this.roleService.getAllRoles(pager, filter)
  }

  @Mutation(() => Role, { nullable: true })
  async createRole(
    @Arg('name') name: string,
    @Arg('userId') userId: string
  ): Promise<Role> {
    return this.roleService.createRole(name, userId);
  }
}