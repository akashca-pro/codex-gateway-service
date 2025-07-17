import { IAdminProfileService } from "@/domain/auth-service/admin/IAdminProfileService";
import { TokenContext } from "@/types/TokenContext";
import { AdminProfileRequest, AdminProfileResponse } from "@akashcapro/codex-shared-utils";


export class AdminProfileUseCases {

    constructor(
        private profile_service : IAdminProfileService
    ){}

    async profile(data : AdminProfileRequest, meta?:TokenContext) : Promise<AdminProfileResponse> {
        return this.profile_service.profile(data,meta);
    }

}