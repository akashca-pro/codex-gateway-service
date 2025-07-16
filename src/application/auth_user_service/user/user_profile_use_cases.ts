import { I_User_Profile_Service } from '@/domain/auth_service/user/I_User_Profile_services'
import { Token_Context } from '@/types/token_context'

import {

    User_Profile_Request,
    User_Profile_Response

} from '@akashcapro/codex-shared-utils'

export class User_Profile_Use_Cases {
    constructor(
        private user_service : I_User_Profile_Service
    ){}

    async profile (data : User_Profile_Request, metadata : Token_Context) : Promise<User_Profile_Response> {
        return this.user_service.profile(data, metadata)
    }
}