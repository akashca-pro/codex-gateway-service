import { IAdminProfileService } from "@/infrastructure/grpc/auth-user-service/interfaces/admin/IAdminProfileService";
import { AdminProfileRequest, AdminProfileResponse } from "@akashcapro/codex-shared-utils";


export class AdminProfileUseCases {

    constructor(
        private profile_service : IAdminProfileService
    ){}

    async profile(data : AdminProfileRequest) : Promise<AdminProfileResponse> {
        return this.profile_service.profile(data);
    }

}