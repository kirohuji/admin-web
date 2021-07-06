import { api } from '@/utils/http'
import { DicmanageService } from '@/modules/dicmanage'
import { OrganizationService } from '@/modules/organization'
import { UserService } from '@/modules/user'
import { RoleService } from '@/modules/role'
export const serviceContainer = {
  dicmanageService: new DicmanageService({ api }),
  organizationService: new OrganizationService({ api }),
  userService: new UserService({ api }),
  roleService: new RoleService({ api })
}
