import { NextFunction, Request, Response } from "express";
import ResponseHandler from "@akashcapro/codex-shared-utils/dist/utils/response_handler";
import HTTP_STATUS from "@akashcapro/codex-shared-utils/dist/utils/status_code";
import { uploadImageFileToCloudinary } from "@/util/cloudinary/uploadImageToCloudinary";
import grpcClient from '@/infra/grpc/auth-user-service/UserServices'
import { UpdateProfileRequest } from "@akashcapro/codex-shared-utils";

export const profileController = { 

  profile : async (req: Request, res: Response, next : NextFunction) => {
    try {
      const { userId, email } = req;

      const grpcResponse = await grpcClient.profile({
        userId : (userId as string),
        email  : (email as string) });

      return ResponseHandler.success(res, "Profile data loaded successfully", HTTP_STATUS.OK, {
        ...grpcResponse,
      });
    } catch (error) {
      next(error);
    }
  },

  update : async (req : Request, res : Response, next : NextFunction) => {
    try {
        const { username, firstName, lastName, country, preferredLanguage } = req.validated?.body
        const avatarFile = req.file;
        let avatarUrl = null;

        if(avatarFile){
          const result = await uploadImageFileToCloudinary(
            avatarFile.buffer,
            req.email!
          );

          avatarUrl = result.public_id;
        }

        const dto : UpdateProfileRequest = {
          userId : req.userId!,
          ...(username ? { username } : {}),
          ...(firstName ? { firstName } : {}),
          ...(lastName ? { lastName } : {}),
          ...(country ? { country } : {}),
          ...(preferredLanguage ? { preferredLanguage } : {}),
          ...(avatarUrl ? { avatar : avatarUrl } : {}),
        };
        const result = await grpcClient.updateProfile(dto);
        return ResponseHandler.success(
          res,
          result.message,
          HTTP_STATUS.OK
        )

    } catch (error) {
      next(error);
    }
  }

}
