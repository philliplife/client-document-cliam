export interface inpClaimEdit {
    owner_first_name: string,
    owner_last_name: string,
    insured_first_name: string,
    insured_last_name: string,
    hospital_code: string,
    hospital_name: string,
    documents: []

}

export interface resClaimEdit {
    document_id: string,
    document_name: string,
    document_type: string,
    document_description: string,
    document_status_code: string,
    document_status_text: string,
    document_upload_date: string,
    document_upload_time: string,
    document_upload_by: string,
    autopdf : boolean

}
