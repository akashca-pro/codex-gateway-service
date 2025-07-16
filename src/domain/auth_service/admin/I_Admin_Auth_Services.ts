import { 
    Admin_Login_Request,
    Admin_Login_Response,
    Refresh_Token_Request,
    Refresh_Token_Response
 } from '@akashcapro/codex-shared-utils'


 export interface I_Admin_Auth_Service {

    login : (req : Admin_Login_Request) => Promise<Admin_Login_Response>;

    refresh_token : (req : Refresh_Token_Request) => Promise<Refresh_Token_Response>;

 }