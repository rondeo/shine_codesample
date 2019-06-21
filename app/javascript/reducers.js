import {combineReducers} from 'redux'
import {reduxTokenAuthReducer} from 'redux-token-auth'
import {
  TOGGLE_POSTING_MODAL,
  TOGGLE_SIGNUP_SUCCESS_MODAL,
} from './actions'

const postingModal = function(state={}, action) {
  switch (action.type) {
    case TOGGLE_POSTING_MODAL:
      return {
        ...state,
        open: action.payload.open,
      }
    default:
      return {
        ...state,
        open: false,
      }
  }
}

const signupSuccessModal = function(state={}, action) {
  switch (action.type) {
    case TOGGLE_SIGNUP_SUCCESS_MODAL:
      return {
        ...state,
        open: action.payload.open,
      }
    default:
      return {
        ...state,
        open: false,
      }
  }
}

const tutorbookApp = combineReducers({
  auth: reduxTokenAuthReducer,
  postingModal: postingModal,
  signupSuccessModal: signupSuccessModal,
})

export default tutorbookApp
