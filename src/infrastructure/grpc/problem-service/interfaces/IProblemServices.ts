import { AddSolutionCodeRequest, AddTestCaseRequest, BulkUploadTestCasesRequest, CreateProblemRequest, GetProblemRequest, ListProblemRequest, ListProblemResponse, Problem, RemoveSolutionCodeRequest, RemoveTestCaseRequest, UpdateBasicProblemDetailsRequest, UpdateSolutionCodeRequest } from '@akashcapro/codex-shared-utils/dist/proto/compiled/gateway/problem'
import { Empty } from '@akashcapro/codex-shared-utils/dist/proto/compiled/google/protobuf/empty'

/**
 * Interface representing the structure of grpc client handler
 * 
 * @interface
 */
export interface IGrpcProblemService {

    createProblem : (req : CreateProblemRequest) => Promise<Problem>

    getProblem : (req : GetProblemRequest) => Promise<Problem>

    listProblems : (req : ListProblemRequest) => Promise<ListProblemResponse>

    updateBasicProblemDetails : (req : UpdateBasicProblemDetailsRequest) => Promise<Empty>

    addTestCase : (req : AddTestCaseRequest) => Promise<Empty>

    bulkUploadTestCases : (req : BulkUploadTestCasesRequest) => Promise<Empty>

    removeTestCase : (req : RemoveTestCaseRequest) => Promise<Empty>

    addSolutionCode : (req : AddSolutionCodeRequest) => Promise<Empty>

    updateSolutionCode : (req : UpdateSolutionCodeRequest) => Promise<Empty>

    removeSolutionCode : (req : RemoveSolutionCodeRequest) => Promise<Empty>

}