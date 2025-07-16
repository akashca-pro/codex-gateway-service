import { Token_Context } from '@/types/token_context'
import {

    User_Profile_Request,
    User_Profile_Response

} from '@akashcapro/codex-shared-utils'


export interface I_User_Profile_Service {

    profile : (req : User_Profile_Request, context? : Token_Context) => Promise<User_Profile_Response>

}