import { IUserProfileService } from '@/infra/grpc/auth-user-service/interfaces/User/IUserProfileservices'

import {

    UserProfileRequest,
    UserProfileResponse

} from '@akashcapro/codex-shared-utils'

export class UserProfileUseCases {
    constructor(
        private user_service : IUserProfileService
    ){}

    async profile (data : UserProfileRequest) : Promise<UserProfileResponse> {
        return this.user_service.profile(data)
    }
}