import { Role } from '../entities/RoleEntity';
import { RoleRepository } from '../repositories/RoleRepository';

export class RoleService {
  private roleRepository = new RoleRepository()

  async getAllRoles(): Promise<{
    documents: Role[];
    pagination: any;
  }> {
    return this.roleRepository.findAll({})
  }

  async createRole(name: string, userId: string): Promise<Role> {
    return this.roleRepository.create(name, userId)
  }
}