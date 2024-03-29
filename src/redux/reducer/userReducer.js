import {
  FETCH_USER_LOGIN_SUCCESS,
  USER_LOGOUT_SUCCESS
} from '../action/userAction'

const INITIAL_STATE = {
  account: {
    id: '',
    access_token: '',
    refresh_token: '',
    username: '',
    password: '',
    image: '',
    role: '',
    email: ''
  },
  isAuthenticated: false // user dang nhap hay chua
}

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_LOGIN_SUCCESS:
      return {
        ...state,
        account: {
          id: action?.payload?.DT?.id,
          access_token: action?.payload?.DT?.access_token,
          refresh_token: action?.payload?.DT?.refresh_token,
          username: action?.payload?.DT?.username,
          image: action?.payload?.DT?.image,
          password: action?.payload?.DT?.password,
          role: action.payload.DT.role,
          email: action.payload.DT.email
        },
        isAuthenticated: true
      }

    case USER_LOGOUT_SUCCESS:
      return {
        ...state,
        account: {
          id: '',
          password: '',
          access_token: '',
          refresh_token: '',
          username: '',
          image: '',
          role: '',
          email: ''
        },
        isAuthenticated: false
      }

    default:
      return state
  }
}

export default userReducer
