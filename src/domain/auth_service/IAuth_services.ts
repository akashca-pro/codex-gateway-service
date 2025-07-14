import {
    Signup_Request, Signup_Response,
    Resend_Otp_Request, Resend_Otp_Response,
    Verify_Otp_Request, Verify_Otp_Response,
    Login_Request, Login_Response,
    Google_Login_Request, Google_Login_Response,
    Forgot_Password_Request, Forgot_Password_Response,
    Change_Password_Request, Change_Password_Response,
    Refresh_Token_Request, Refresh_Token_Response
} from '@akashcapro/codex-shared-utils';

export interface IAuthService {
  signup(req: Signup_Request): Promise<Signup_Response>;

  resend_otp(req: Resend_Otp_Request): Promise<Resend_Otp_Response>;

  verify_otp(req: Verify_Otp_Request): Promise<Verify_Otp_Response>;

  login(req: Login_Request): Promise<Login_Response>;

  google_login(req: Google_Login_Request): Promise<Google_Login_Response>;

  forgot_password(req: Forgot_Password_Request): Promise<Forgot_Password_Response>;

  change_password(req: Change_Password_Request): Promise<Change_Password_Response>;

  refresh_token(req : Refresh_Token_Request) : Promise<Refresh_Token_Response>;

}