import { ListRoleResponse, Role, RoleFilterInput, RoleModel } from '../entities/RoleEntity';
import { PagerInput } from '../graphql/typeDefs/paginationTypeDef';
import { RoleRepository } from '../repositories/RoleRepository';
import { pagination } from '../utils/pagination';

export class RoleService {
  private roleRepository = new RoleRepository()

  async getAllRoles(pager?: PagerInput, filter?: RoleFilterInput): Promise<ListRoleResponse> {
    // You can add any business logic here if needed
    const roles = await this.roleRepository.findAll(pager, filter);
    const totalRoles = await RoleModel.countDocuments();
    return pagination(roles, totalRoles, pager?.page, pager?.limit);
  }


  async createRole(name: string, userId: string): Promise<Role> {
    return this.roleRepository.create(name, userId)
  }
}