import { NextFunction, Request, Response } from "express";
import ResponseHandler from "@akashcapro/codex-shared-utils/dist/utils/response_handler";
import HTTP_STATUS from "@akashcapro/codex-shared-utils/dist/utils/status_code";
import grpcClient from '@/transport/grpc/auth-user-service/AdminServices'
import { USER_SUCCESS_TYPES } from "@/const/auth-user/UserSuccessTypes.const";

export const profileController = {

  profile : async (req: Request, res: Response,next : NextFunction) => {
    try {
      req.log.info({userId : req.userId},'Load profile request recieved');
      const { userId,  email } = req;
      const grpcResponse = await grpcClient.profile({
        userId : (userId as string),
        email  : (email as string) });
      req.log.info({userId : req.userId}, 'Load profile response recieved')
      return ResponseHandler.success(
        res, 
        USER_SUCCESS_TYPES.PROFILE_DATA_LOADED, 
        HTTP_STATUS.OK, {
        ...grpcResponse,
      });
    } catch (error) {
      req.log.error({error, userId : req.userId},'Load profile failed')
      next(error);
    }
  }
}
