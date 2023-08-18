const throwError = (message: string) => {
  throw new Error(message)
}

const config = {
  TOKEN_FIELD: 'authToken',
  API_URL: import.meta.env.VITE_API_BASE_URL || throwError('Missing API URL env variable.')
}

export default config
