import { 
    AddSolutionCodeRequest, 
    AddTestCaseRequest, 
    BulkUploadTestCasesRequest, 
    CheckProblemTitleRequest, 
    CheckQuestionIdRequest, 
    CreateProblemRequest, 
    GetProblemPublicResponse, 
    GetProblemRequest, 
    ListProblemRequest, 
    ListProblemResponse, 
    Problem, 
    ProblemServiceClient, 
    RemoveSolutionCodeRequest, 
    RemoveTestCaseRequest, 
    UpdateBasicProblemDetailsRequest, 
    UpdateSolutionCodeRequest, 
    UpdateTemplateCodeRequest 
} from "@akashcapro/codex-shared-utils/dist/proto/compiled/gateway/problem";
import { GrpcBaseService } from "../GrpcBaseService";
import { config } from "@/config";
import { credentials } from "@grpc/grpc-js";
import { Empty } from "@akashcapro/codex-shared-utils/dist/proto/compiled/google/protobuf/empty";

/**
 * Class implementing the problem grpc client call.
 * 
 * @class
 * @extends {GrpcBaseService}
 */
class GrpcProblemService extends GrpcBaseService {

    #_client : ProblemServiceClient

    constructor(){
        super();
        this.#_client = new ProblemServiceClient(
            config.GRPC_PROBLEM_SERVICE_URL!,
            credentials.createInsecure()
        );
    }

    createProblem = async (
        request : CreateProblemRequest
    ) : Promise<Problem> => {
        return this.grpcCall(
            this.#_client.createProblem.bind(this.#_client),
            request
        );
    }

    getProblem = async (
        request: GetProblemRequest
    ) : Promise<Problem> => {
        return this.grpcCall(
            this.#_client.getProblem.bind(this.#_client),
            request
        );
    }

    listProblems = (
        request: ListProblemRequest
    ) : Promise<ListProblemResponse> => {
        return this.grpcCall(
            this.#_client.listProblems.bind(this.#_client),
            request
        );
    }

    updateBasicProblemDetails = async (
        request: UpdateBasicProblemDetailsRequest
    ) : Promise<Empty> => {
        return this.grpcCall(
            this.#_client.updateBasicProblemDetails.bind(this.#_client),
            request
        );
    }

    addTestCase = async (
        request: AddTestCaseRequest
    ) : Promise<Empty> => {
        return this.grpcCall(
            this.#_client.addTestCase.bind(this.#_client),
            request
        );
    }

    bulkUploadTestCases = async(
        request: BulkUploadTestCasesRequest
    ) : Promise<Empty> => {
        return this.grpcCall(
            this.#_client.bulkUploadTestCases.bind(this.#_client),
            request
        );
    }

    removeTestCase = async (
        request: RemoveTestCaseRequest
    ) : Promise<Empty> => {
        return this.grpcCall(
            this.#_client.removeTestCase.bind(this.#_client),
            request
        );
    }

    addSolutionCode = async (
        request: AddSolutionCodeRequest
    ) : Promise<Empty> => {
        return this.grpcCall(
            this.#_client.addSolutionCode.bind(this.#_client),
            request
        );
    }

    updateSolutionCode = async (
        request: UpdateSolutionCodeRequest
    ) : Promise<Empty> => {
        return this.grpcCall(
            this.#_client.updateSolutionCode.bind(this.#_client),
            request
        );
    }

    removeSolutionCode = async (
        request: RemoveSolutionCodeRequest
    ) : Promise<Empty> => {
        return this.grpcCall(
            this.#_client.removeSolutionCode.bind(this.#_client),
            request
        );
    }

    getProblemForPublic = async (
        request : GetProblemRequest
    ) : Promise<GetProblemPublicResponse> => {
        return this.grpcCall(
            this.#_client.getProblemForPublic.bind(this.#_client),
            request
        );
    }

    checkQuestionIdAvailability = async (
        request : CheckQuestionIdRequest
    ) : Promise<Empty> => {
        return this.grpcCall(
            this.#_client.checkQuestionIdAvailability.bind(this.#_client),
            request
        )
    }

    checkTitleAvailablity = async (
        request : CheckProblemTitleRequest
    ) : Promise<Empty> => {
        return this.grpcCall(
            this.#_client.checkProblemTitle.bind(this.#_client),
            request
        )
    } 

    updateTemplateCode = async (
        request : UpdateTemplateCodeRequest
    ) : Promise<Empty> => {
        return this.grpcCall(
            this.#_client.updateTemplateCode.bind(this.#_client),
            request
        )
    }
}

export default new GrpcProblemService();