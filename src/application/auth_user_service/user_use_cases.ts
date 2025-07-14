import { IUserService } from '@/domain/auth_service/IUser_services'
import { User_Context } from '@/types/user_context'

import {

    Profile_Request,
    Profile_Response

} from '@akashcapro/codex-shared-utils'

export class User_Use_Cases {
    constructor(
        private user_service : IUserService
    ){}

    async profile (data : Profile_Request, metadata : User_Context) : Promise<Profile_Response> {
        return this.user_service.profile(data, metadata)
    }
}