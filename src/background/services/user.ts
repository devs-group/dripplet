import { ApiService } from './api'

export interface GetUserCreditsResponse {
  credits: number
}

export class UserApiService extends ApiService {
  constructor() {
    super()
  }

  public async saveUser(): Promise<Response> {
    return this.post({
      endpoint: '/auth/user',
      body: {}
    })
  }

  public async getUserCredits(): Promise<GetUserCreditsResponse> {
    return this.get<GetUserCreditsResponse>({
      endpoint: '/auth/user/credits'
    })
  }
}
