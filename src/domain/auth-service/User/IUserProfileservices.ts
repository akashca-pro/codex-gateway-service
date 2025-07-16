import { TokenContext } from '@/types/TokenContext'
import {

    UserProfileRequest,
    UserProfileResponse

} from '@akashcapro/codex-shared-utils'


export interface IUserProfileService {

    profile : (req : UserProfileRequest, context? : TokenContext) => Promise<UserProfileResponse>

}