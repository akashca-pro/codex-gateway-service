import { IAdminProfileService } from "@/domain/auth-service/admin/IAdminProfileService";
import { TokenContext } from "@/types/TokenContext";
import { AdminProfileRequest, AdminProfileResponse } from "@akashcapro/codex-shared-utils";


export class Admin_Profile_Use_Cases {

    constructor(
        private profile_service : IAdminProfileService
    ){}

    async profile(data : AdminProfileRequest, meta?:TokenContext) : Promise<AdminProfileResponse> {
        return this.profile_service.profile(data,meta);
    }

}