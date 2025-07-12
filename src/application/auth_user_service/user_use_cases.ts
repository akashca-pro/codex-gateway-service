import { IUserService } from '@/domain/auth_service/IUser_services'
import { User_Context } from '@/types/user_context'

import {

    ProfileRequest,
    ProfileResponse

} from '@akashcapro/codex-shared-utils'

export class User_Use_Cases {
    constructor(
        private user_service : IUserService
    ){}

    async profile (data : ProfileRequest, metadata : User_Context) : Promise<ProfileResponse> {
        return this.user_service.profile(data, metadata)
    }
}