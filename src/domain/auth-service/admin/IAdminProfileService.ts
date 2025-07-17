import {
    
    AdminProfileRequest, AdminProfileResponse,
    
} from '@akashcapro/codex-shared-utils'
import { TokenContext } from '@/types/TokenContext'


export interface IAdminProfileService {

    profile (req : AdminProfileRequest, meta?:TokenContext) : Promise<AdminProfileResponse> 

}