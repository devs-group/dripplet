export class ApiService {
  private baseUrl: string

  constructor() {
    this.baseUrl = 'http://localhost:1991'
  }

  private async getAccessToken(): Promise<string | null> {
    const key = 'accessToken'
    const token = await chrome.storage.local.get(key)
    if (!token) {
      console.error('No authentication token found')
      return null
    }
    return token[key]
  }

  public async post<T>({ endpoint, body }: { endpoint: string; body: any }) {
    const token = await this.getAccessToken()
    if (!token) {
      throw new Error(`Token could not be found in local storage`)
    }

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body)
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return response.json() as T
    } catch (error) {
      throw new Error(`HTTP error! error: ${error}`)
    }
  }

  public async get<T>({ endpoint }: { endpoint: string }) {
    const token = await this.getAccessToken()
    if (!token) {
      throw new Error(`Token could not be found in local storage`)
    }

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return response.json() as T
    } catch (error) {
      throw new Error(`HTTP error! error: ${error}`)
    }
  }
}
