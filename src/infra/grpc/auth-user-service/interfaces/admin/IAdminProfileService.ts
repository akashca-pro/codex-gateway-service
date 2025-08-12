import {
    
    AdminProfileRequest, AdminProfileResponse,
    
} from '@akashcapro/codex-shared-utils'


export interface IAdminProfileService {

    profile (req : AdminProfileRequest) : Promise<AdminProfileResponse> 

}