import { NextFunction, Request, Response } from "express";
import grpcSubmissionClient from '@/transport/grpc/problem-service/SubmissionServices'
import ResponseHandler from "@akashcapro/codex-shared-utils/dist/utils/response_handler";
import { SUBMISSION_SUCCESS_TYPE } from "@/const/problem/SuccessTypes.const";
import HTTP_STATUS from "@akashcapro/codex-shared-utils/dist/utils/status_code";

export const LeaderboardController = {
    getTopKGlobal : async (req : Request, res : Response, next : NextFunction) => {
        try {
            const { k } = req.validated?.query;
            req.log.info({ k }, 'Get top k global leaderboard request recieved');
            const result = await grpcSubmissionClient.listTopKGlobalLeaderboard({ k });
            req.log.info({ k },'Get top k global leaderboard response recieved');
            return ResponseHandler.success(
                res,
                SUBMISSION_SUCCESS_TYPE.GLOBAL_LEADERBOARD,
                HTTP_STATUS.OK,
                result
            );
        } catch (error) {
            next(error);
        }
    },
    getTopKCountry : async (req : Request, res : Response, next : NextFunction) => {
        try {
            const { k, country } = req.validated?.query;
            req.log.info({ k, country }, 'Get top k country leaderboard request recieved');
            const result = await grpcSubmissionClient.listTopKCountryLeaderboard({ k, country });
            req.log.info({ k, country },'Get top k country leaderboard response recieved');
            return ResponseHandler.success(
                res,
                SUBMISSION_SUCCESS_TYPE.COUNTRY_LEADERBOARD,
                HTTP_STATUS.OK,
                result
            );
        } catch (error) {
            next(error);
        }
    }
}
