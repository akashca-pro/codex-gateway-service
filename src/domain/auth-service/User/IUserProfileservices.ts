import {

    UserProfileRequest,
    UserProfileResponse

} from '@akashcapro/codex-shared-utils'


export interface IUserProfileService {

    profile : (req : UserProfileRequest) => Promise<UserProfileResponse>

}