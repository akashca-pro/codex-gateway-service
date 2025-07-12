import { Auth_Use_Cases } from "@/application/auth_use_cases";
import { Grpc_Auth_Service } from "@/infrastructure/grpc/auth_services";

import { grpc_handler } from "@/utility/grpc_handler";

const authUseCase = new Auth_Use_Cases(new Grpc_Auth_Service);

export const auth_controller = {
    
    signup : grpc_handler('signup', authUseCase.signup),

    resend_otp : grpc_handler('resend_otp', authUseCase.resend_otp),

    verify_otp : grpc_handler('verify_otp', authUseCase.verify_otp),

    login : grpc_handler('login', authUseCase.login),

    google_login : grpc_handler('google_login', authUseCase.google_login),

    forgot_password : grpc_handler('forgot_password', authUseCase.forgot_password),

    change_password : grpc_handler('change_password', authUseCase.change_password)
}