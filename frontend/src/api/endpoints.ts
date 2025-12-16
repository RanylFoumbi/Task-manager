export const API_BASE_URL = "http://localhost:8000/api";
export const AUTH_ENDPOINT = `${API_BASE_URL}/auth`;

export const LOGIN_URL = `${AUTH_ENDPOINT}/login/`;
export const REGISTER_URL = `${AUTH_ENDPOINT}/register/`;
export const LOGOUT_URL = `${AUTH_ENDPOINT}/logout/`;
export const TOKEN_REFRESH_URL = `${AUTH_ENDPOINT}/token/refresh/`;
export const PASSWORD_RESET_URL = `${AUTH_ENDPOINT}/password/reset/`;
export const PASSWORD_RESET_CONFIRM_URL = `${AUTH_ENDPOINT}/password/reset/confirm/`;
