import { NextFunction, Request, Response } from "express";
import grpcSubmissionClient from '@/transport/grpc/problem-service/SubmissionServices'
import ResponseHandler from "@akashcapro/codex-shared-utils/dist/utils/response_handler";
import { SUBMISSION_SUCCESS_TYPE } from "@/const/problem/SuccessTypes.const";
import HTTP_STATUS from "@akashcapro/codex-shared-utils/dist/utils/status_code";

export const userDashboardController = {
    getDashboard : async (req : Request, res : Response, next : NextFunction) => {
        try {
            const { userTimezone } = req.validated?.query
            const result = await grpcSubmissionClient.getDashboardStats({
                userId : req.userId!,
                userTimezone
            });
            return ResponseHandler.success(
                res,
                SUBMISSION_SUCCESS_TYPE.DASHBOARD_STATS,
                HTTP_STATUS.OK,
                result
            )
        } catch (error) {
            next(error);
        }
    }
}