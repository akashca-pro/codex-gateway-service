import { GetDashboardStatsRequest, GetDashboardStatsResponse, GetProblemSubmissionStatsResponse, ListProblemSpecificSubmissionRequest, ListProblemSpecificSubmissionResponse, ListTopKCountryLeaderboardRequest, ListTopKCountryLeaderboardResponse, ListTopKGlobalLeaderboardRequest, ListTopKGlobalLeaderboardResponse, SubmissionServiceClient } from "@akashcapro/codex-shared-utils/dist/proto/compiled/gateway/problem";
import { GrpcBaseService } from "../GrpcBaseService";
import { config } from "@/config";
import { credentials } from "@grpc/grpc-js";
import { Empty } from "@akashcapro/codex-shared-utils/dist/proto/compiled/google/protobuf/empty";

/**
 * Class implementing the submission grpc client call.
 * 
 * @class
 * @extends {GrpcBaseService}
 */
export class GrpcSubmissionService extends GrpcBaseService {

    #_client : SubmissionServiceClient

    constructor(){
        super();
        this.#_client = new SubmissionServiceClient(
            config.GRPC_PROBLEM_SERVICE_URL!,
            credentials.createInsecure()
        )
    }

    listProblemSpecificSubmission = async (
        request : ListProblemSpecificSubmissionRequest
    ) : Promise<ListProblemSpecificSubmissionResponse> => {
        return this.grpcCall(
            this.#_client.listProblemSpecificSubmission.bind(this.#_client),
            request
        )
    }

    listTopKGlobalLeaderboard = async (
        request : ListTopKGlobalLeaderboardRequest
    ) : Promise<ListTopKGlobalLeaderboardResponse> => {
        return this.grpcCall(
            this.#_client.listTopKGlobalLeaderboard.bind(this.#_client),
            request
        )
    }

    listTopKCountryLeaderboard = async (
        request : ListTopKCountryLeaderboardRequest
    ) : Promise<ListTopKCountryLeaderboardResponse> => {
        return this.grpcCall(
            this.#_client.listTopKCountryLeaderboard.bind(this.#_client),
            request
        )
    }

    getDashboardStats = async (
        request : GetDashboardStatsRequest
    ) : Promise<GetDashboardStatsResponse> => {
        return this.grpcCall(
            this.#_client.getDashboardStats.bind(this.#_client),
            request
        )
    }

    getProblemSubmissionStats = async () : Promise<GetProblemSubmissionStatsResponse> => {
        return this.grpcCall(
            this.#_client.getProblemSubmissionStats.bind(this.#_client),
            Empty
        )
    }

}

export default new GrpcSubmissionService();