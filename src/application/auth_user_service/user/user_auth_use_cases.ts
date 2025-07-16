import { I_User_Auth_Service } from "@/domain/auth_service/user/I_User_Auth_services";
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

export class User_Auth_Use_Cases {
  constructor(
    private auth_service: I_User_Auth_Service
  ) {}

  async signup(data: Signup_Request): Promise<Signup_Response> {
    return this.auth_service.signup(data);
  }

  async login(data: Login_Request): Promise<Login_Response> {
    return this.auth_service.login(data);
  }

  async resend_otp(data: Resend_Otp_Request): Promise<Resend_Otp_Response> {
    return this.auth_service.resend_otp(data);
  }

  async verify_otp(data: Verify_Otp_Request): Promise<Verify_Otp_Response> {
    return this.auth_service.verify_otp(data);
  }

  async google_login(data: Google_Login_Request): Promise<Google_Login_Response> {
    return this.auth_service.google_login(data);
  }

  async forgot_password(data: Forgot_Password_Request): Promise<Forgot_Password_Response> {
    return this.auth_service.forgot_password(data);
  }

  async change_password(data: Change_Password_Request): Promise<Change_Password_Response> {
    return this.auth_service.change_password(data);
  }

  async refresh_token(data : Refresh_Token_Request) : Promise<Refresh_Token_Response> {
    return this.auth_service.refresh_token(data);
  }

}