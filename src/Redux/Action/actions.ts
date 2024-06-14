import { SET_USER, SET_TOKEN, LOGOUT } from '../ActionTypes/actionTypes';
interface userEntity {
  userSeq: number,
  ronaUnqIdt: number,
  discordId: number,
  discordEmail: string,
  discordGlobalName: string,
}
interface jwtTokenDto {
  discordAccessToken:string,
  accessToken: string,
  refreshToken: string,
  expiresIn: string,
} 
export const setUser = (userEntity:userEntity) => ({
  type: SET_USER,
  payload: userEntity,
});

export const setToken = (jwtTokenDto:jwtTokenDto) => ({
  type: SET_TOKEN,
  payload: jwtTokenDto,
});
export const logout = () => ({
  type: LOGOUT,
});