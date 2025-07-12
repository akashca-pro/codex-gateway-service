import { User_Context } from '@/types/user_context'
import {

    ProfileRequest,
    ProfileResponse

} from '@akashcapro/codex-shared-utils'


export interface IUserService {

    profile : (req : ProfileRequest, context? : User_Context) => Promise<ProfileResponse>

}