import { api } from '@/utils/http'
import { DicmanageService } from '@/modules/dicmanage'
import { OrganmanageService } from '@/modules/organmanage'
export const serviceContainer = {
  dicmanageService: new DicmanageService({ api }),
  OrganmanageService: new OrganmanageService({ api })
}
