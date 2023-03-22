export interface inpClaimVerify {
    claim_no: string,
    documents: Array<fileDoc>

}
export interface resClaimVerfy {
    claim_no: string,
    documents_valid: boolean,
    documents: Array<fileDoc>
}

export interface fileDoc {
    document_id: string,
    document_name: string,
    document_type: string,
    document_description: string,
    document_valid: boolean,
    document_status_code: string,
    document_status_text: string
}