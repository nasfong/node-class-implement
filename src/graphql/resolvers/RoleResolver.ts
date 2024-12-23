import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { ListRoleResponse, Role } from "../../entities/RoleEntity";
import { RoleService } from "../../services/RoleService";

@Resolver(Role)
export class RoleResolver {
  private roleService = new RoleService()

  // @Query(() => ListRoleResponse, { nullable: true })
  // async roles() {
  //   return this.roleService.getAllRoles()
  // }

  // @Mutation(() => Role, { nullable: true })
  // async createRole(
  //   @Arg('name') name: string,
  //   @Arg('userId') userId: string
  // ): Promise<Role> {
  //   return this.roleService.createRole(name, userId);
  // }
}