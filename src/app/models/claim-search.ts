export interface inpClaimSearch {
    claim_no: string,
    policy_type: string,
    policy_no: string,
    first_name: string,
    last_name: string,
    relation: string
}

export interface resClaimSearch {
    claim_no: string,
    policy_type: string,
    policy_no: string,
    owner_first_name: string,
    owner_last_name: string,
    insured_first_name: string,
    insured_last_name: string,
    claim_status: string,
    docushare_submit: boolean

}