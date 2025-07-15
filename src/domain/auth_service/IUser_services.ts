import { User_Context } from '@/types/user_context'
import {

    Profile_Request,
    Profile_Response

} from '@akashcapro/codex-shared-utils'


export interface IUserService {

    profile : (req : Profile_Request, context? : User_Context) => Promise<Profile_Response>

}