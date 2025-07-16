import { I_Admin_Auth_Service } from "@/domain/auth_service/admin/I_Admin_Auth_Services";
import { Admin_Login_Request, Admin_Login_Response, Refresh_Token_Request, Refresh_Token_Response } from "@akashcapro/codex-shared-utils";

export class Admin_Auth_Use_Cases {
    constructor(
        private auth_services : I_Admin_Auth_Service
    ){}

    async login (data : Admin_Login_Request) : Promise<Admin_Login_Response> {
        return this.auth_services.login(data);
    }

    async refresh_token (data : Refresh_Token_Request) : Promise<Refresh_Token_Response> {
        return this.auth_services.refresh_token(data);
    }

}