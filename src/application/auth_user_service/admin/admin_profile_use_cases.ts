import { I_Admin_Profile_Service } from "@/domain/auth_service/admin/I_Admin_Profile_Service";
import { Token_Context } from "@/types/token_context";
import { Admin_Profile_Request, Admin_Profile_Response } from "@akashcapro/codex-shared-utils";


export class Admin_Profile_Use_Cases {

    constructor(
        private profile_service : I_Admin_Profile_Service
    ){}

    async profile(data : Admin_Profile_Request, meta?:Token_Context) : Promise<Admin_Profile_Response> {
        return this.profile_service.profile(data,meta);
    }

}