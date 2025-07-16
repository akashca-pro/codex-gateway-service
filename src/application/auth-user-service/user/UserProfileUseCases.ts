import { IUserProfileService } from '@/domain/auth-service/User/IUserProfileservices'
import { TokenContext } from '@/types/TokenContext'

import {

    UserProfileRequest,
    UserProfileResponse

} from '@akashcapro/codex-shared-utils'

export class UserProfileUseCases {
    constructor(
        private user_service : IUserProfileService
    ){}

    async profile (data : UserProfileRequest, metadata : TokenContext) : Promise<UserProfileResponse> {
        return this.user_service.profile(data, metadata)
    }
}