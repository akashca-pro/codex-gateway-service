import {
    
    Admin_Profile_Request, Admin_Profile_Response,
    
} from '@akashcapro/codex-shared-utils'
import { Token_Context } from '@/types/token_context'
import { Metadata } from '@grpc/grpc-js'

export interface I_Admin_Profile_Service {

    profile (
        req : Admin_Profile_Request,
        meta?:Token_Context
    ) : Promise<Admin_Profile_Response> 

}