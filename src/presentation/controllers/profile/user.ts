import { NextFunction, Request, Response } from "express";
import ResponseHandler from "@akashcapro/codex-shared-utils/dist/utils/response_handler";
import HTTP_STATUS from "@akashcapro/codex-shared-utils/dist/utils/status_code";
import { uploadImageFileToCloudinary } from "@/util/cloudinary/uploadImageToCloudinary";
import grpcClient from '@/infra/grpc/auth-user-service/UserServices'
import { ChangeEmailRequest, ChangePasswordRequest, DeleteAccountRequest, 
  ResendOtpRequest, UpdateProfileRequest, VerifyNewEmailRequest } from "@akashcapro/codex-shared-utils";
import { UserSuccessTypes } from "@/enums/auth-user/UserSuccessTypes.enum";
import { OtpType } from "@/enums/auth-user/OtpType.enum";
import redis from "@/config/redis";
import { REDIS_KEY_PREFIX } from "@/config/redis/keyPrefix";

export const profileController = { 

  profile : async (req: Request, res: Response, next : NextFunction) => {
    try {
      const { userId, email } = req;
      const cached = await redis.get(`${REDIS_KEY_PREFIX.USER_PROFILE}${userId}`)
      if(cached){
        return ResponseHandler.success(
          res,
          UserSuccessTypes.ProfileDataLoaded,
          HTTP_STATUS.OK,
          JSON.parse(cached)
        );
      }
      const grpcResponse = await grpcClient.profile({
        userId : (userId as string),
        email  : (email as string) });

      return ResponseHandler.success(
        res, 
        UserSuccessTypes.ProfileDataLoaded, 
        HTTP_STATUS.OK, 
        grpcResponse
      );
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
  },

  changePass : async (req : Request, res : Response, next : NextFunction) => {
    try {
        const { currPass, newPass } = req.validated?.body;
        const dto : ChangePasswordRequest = {
          userId : req.userId!,
          currPass,
          newPass
        }
        await grpcClient.changePassword(dto);
        return ResponseHandler.success(
          res,
          UserSuccessTypes.ChangePass,
          HTTP_STATUS.OK
        )
    } catch (error) {
      next(error);
    }
  },
  
  changeEmail : async (req : Request, res : Response, next : NextFunction) => {
    try {
        const { newEmail, password } = req.validated?.body;
        const dto : ChangeEmailRequest = {
          userId : req.userId!,
          newEmail,
          password
        }
        await grpcClient.changeEmail(dto);
        return ResponseHandler.success(
          res,
          UserSuccessTypes.OtpIssued,
          HTTP_STATUS.OK
        )
    } catch (error) {
      next(error);
    }
  },

  resendOtp : async (req : Request, res : Response, next : NextFunction) => {
    try {
        const { email } = req.validated?.body;
        const dto : ResendOtpRequest = {
          email,
          otpType : OtpType.CHANGE_EMAIL
        }
        await grpcClient.resendOtp(dto);
        return ResponseHandler.success(
          res,
          UserSuccessTypes.NewOtpIssued,
          HTTP_STATUS.OK
        )
    } catch (error) {
      next(error);
    }
  },

  verifyOtp : async (req : Request, res : Response, next : NextFunction) => {
    try {
        const { email, otp } = req.validated?.body;
        const dto : VerifyNewEmailRequest = {
          userId : req.userId!,
          email,
          otp
        };
        await grpcClient.verifyNewEmail(dto);
        return ResponseHandler.success(
          res,
          UserSuccessTypes.ChangeEmail,
          HTTP_STATUS.OK
        )
    } catch (error) {
      next(error);
    }
  },

  deleteAccount : async (req : Request, res : Response, next : NextFunction) => {
    try {
      const { password } = req.validated?.body;
      const dto : DeleteAccountRequest = {
        userId : req.userId!,
        password
      }
      await grpcClient.deleteAccount(dto);
      return ResponseHandler.success(
        res,
        UserSuccessTypes.AccountDeleted,
        HTTP_STATUS.OK
      )
    } catch (error) {
      next(error);
    }
  }

}
