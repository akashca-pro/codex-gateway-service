import { IAdminProfileService } from "@/infra/grpc/auth-user-service/interfaces/admin/IAdminProfileService";
import { AdminProfileRequest, AdminProfileResponse } from "@akashcapro/codex-shared-utils";


export class AdminProfileUseCases {

    constructor(
        private profileService : IAdminProfileService
    ){}

    async profile(data : AdminProfileRequest) : Promise<AdminProfileResponse> {
        return this.profileService.profile(data);
    }

}