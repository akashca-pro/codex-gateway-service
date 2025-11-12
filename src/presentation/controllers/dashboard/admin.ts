import { NextFunction, Request, Response } from "express";
import grpcSubmissionClient from "@/transport/grpc/problem-service/SubmissionServices";
import grpcUserClient from "@/transport/grpc/auth-user-service/AdminServices";
import grpcCollabClient from "@/transport/grpc/collab-service/collab-service";
import ResponseHandler from "@akashcapro/codex-shared-utils/dist/utils/response_handler";
import HTTP_STATUS from "@akashcapro/codex-shared-utils/dist/utils/status_code";

export const adminDashboardController = {
    getDashboard : async (req : Request, res : Response, next : NextFunction) => {
        try {
            const [problemSubmissionStats, userStats, collabStats] = await Promise.all([
                grpcSubmissionClient.getProblemSubmissionStats(),
                grpcUserClient.userStats(),
                grpcCollabClient.getSessionStats()
            ])
            const dashboardStats = {
                problemSubmissionStats,
                userStats,
                collabStats
            }
            return ResponseHandler.success(
                res,
                'DASHBOARD_STATS',
                HTTP_STATUS.OK,
                dashboardStats
            )
        } catch (error) {
            next(error);
        }
    }
}