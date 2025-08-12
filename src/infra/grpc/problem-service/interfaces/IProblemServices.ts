import { AddSolutionCodeRequest, AddTestCaseRequest, BulkUploadTestCasesRequest, CreateProblemRequest, GetProblemRequest, ListProblemRequest, ListProblemResponse, Problem, RemoveSolutionCodeRequest, RemoveTestCaseRequest, UpdateBasicProblemDetailsRequest, UpdateSolutionCodeRequest } from '@akashcapro/codex-shared-utils/dist/proto/compiled/gateway/problem'
import { Empty } from '@akashcapro/codex-shared-utils/dist/proto/compiled/google/protobuf/empty'

/**
 * Interface representing the structure of grpc client handler
 * 
 * @interface
 */
export interface IGrpcProblemService {

    createProblem : (request : CreateProblemRequest) => Promise<Problem>

    getProblem : (request : GetProblemRequest) => Promise<Problem>

    listProblems : (request : ListProblemRequest) => Promise<ListProblemResponse>

    updateBasicProblemDetails : (request : UpdateBasicProblemDetailsRequest) => Promise<Empty>

    addTestCase : (request : AddTestCaseRequest) => Promise<Empty>

    bulkUploadTestCases : (request : BulkUploadTestCasesRequest) => Promise<Empty>

    removeTestCase : (request : RemoveTestCaseRequest) => Promise<Empty>

    addSolutionCode : (request : AddSolutionCodeRequest) => Promise<Empty>

    updateSolutionCode : (request : UpdateSolutionCodeRequest) => Promise<Empty>

    removeSolutionCode : (request : RemoveSolutionCodeRequest) => Promise<Empty>

}