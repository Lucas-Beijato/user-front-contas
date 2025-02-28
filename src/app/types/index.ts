export type User_Type = {
    id: string,
    name: string,
    is_active: boolean
};

export type ApiResponseAdm_Type<T> =
    { data: T } |
    { error: string }

export type TokenResponse = { token: string }
export type AccountListResponse = { accounts: Array<Account_Type> }
export type AccountResponse = { account: Account_Type }
export type UpdateAccountResponse = { message: string }
export type CreateNewAccount = { messagem: string }
export type ErrorResponse = { error: string }

export type Account_Type = {
    id: string,
    user_id: string,
    description: string,
    limit_date: string,
    value: number,
    is_paid: boolean
}

