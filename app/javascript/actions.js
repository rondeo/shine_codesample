//redux-token-auth-specific actions
import {generateAuthActions} from 'redux-token-auth'
import {
  AUTH_URL,
  RAILS_CSRF_HEADERS,
} from './constants'
import axios from 'axios'

const config = {
  authUrl: AUTH_URL,
  userAttributes: {
    id: 'id',
    type: 'type',
    email: 'email',
    firstName: 'firstName',
    lastName: 'lastName',
    hasStripeAccount: 'hasStripeAccount',
    client: 'client',
    accessToken: 'accessToken',
    stripeExpressOauthUrl: 'stripeExpressOauthUrl',
    stripeExpressOauthRedirectUrl: 'stripeExpressOauthRedirectUrl',
    stripeClientId: 'stripeClientId',
    stripePublishId: 'stripePublishId',
    createdAt: 'createdAt',
    hourlyRateCents: 'hourlyRateCents',
    imageUrl: 'imageUrl',
  },
  userRegistrationAttributes: {
    client: 'client',
    accessToken: 'accessToken',
    type: 'type',
    email: 'email',
    firstName: 'first_name',
    lastName: 'last_name',
    zip: 'zip',
    avatar: 'avatar',
    acceptToS: 'accept_tos',
    // tutor reg
    subject: 'subject',
    yrsExp: 'years_exp',
    subjectQualifications: 'subject_qualifications',
    educationsAttributes: 'educations_attributes',
    referencesAttributes: 'references_attributes',
    image: 'image',
    approved: 'approved',
    // parent reg
    studentName: 'student_name',
  },
}

const {
  registerUser,
  verifyToken,
  signInUser,
  signOutUser,
  verifyCredentials,
} = generateAuthActions(config)

export {
  registerUser,
  signInUser,
  signOutUser,
  verifyCredentials,
}


/**
 * TUTOR MODAL
 */
export const TOGGLE_POSTING_MODAL = 'TOGGLE_POSTING_MODAL'
export const togglePostingModal = (open) => {
  return {
    type: TOGGLE_POSTING_MODAL,
    payload: {
      open: open,
    }
  }
}

export const TOGGLE_SIGNUP_SUCCESS_MODAL = 'TOGGLE_SIGNUP_SUCCESS_MODAL'
export const toggleSignupSuccessModal = (open) => {
  return {
    type: TOGGLE_SIGNUP_SUCCESS_MODAL,
    payload: {
      open: open,
    },
  }
}



