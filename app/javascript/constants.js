import ReactOnRails from 'react-on-rails'
import Grade from 'material-ui-icons/Grade'
import Add from 'material-ui-icons/Add'
import Colorize from 'material-ui-icons/Colorize'
import Code from 'material-ui-icons/Code'
import Style from 'material-ui-icons/Style'
import LocalLibrary from 'material-ui-icons/LocalLibrary'
import Language from 'material-ui-icons/Language'
import MusicNote from 'material-ui-icons/MusicNote'


export const FILESTACK_API_KEY = '4823847239583450358'
export const RAILS_CSRF_TOKEN = ReactOnRails.authenticityToken()
export const RAILS_CSRF_HEADERS = (opts) => ReactOnRails.authenticityHeaders(opts)

export const AUTH_URL = '/api/v1/auth'

export const API_PREFIX = '/api/v1'

export const SUBJECTS = [
  {
    name: 'Select subject',
    gradeLevels: [
    'Select a subject above first',
    ],
    icon: Grade,
  },
  {
    name: 'Math',
    gradeLevels: [
      'Grades K-6',
      'Pre-Algebra',
      'Algebra I',
      'Algebra II',
      'Trigonometry',
      'Pre-Calculus',
      'Calculus',
      'Statistics',
    ],
    icon: Add,
  },
  {
    name: 'Science',
    gradeLevels: [
      'Grades K-8',
      'Biology',
      'Chemistry',
      'Physics',
    ],
    icon: Colorize,
  },
  {
    name: 'Test Prep',
    gradeLevels: [
      'SAT',
      'ACT',
      'GRE',
      'GMAT',
      'LSAT',
      'MCAT',
      'Other',
    ],
    icon: Style,
  },
  {
    name: 'Coding',
    gradeLevels: [
      'Grades K-5',
      'Grades 6-8',
      'Grades 9-12',
      'AP Computer Science',
      'Scratch',
      'Ruby',
      'Python',
      'Wordpress',
      'Java',
      'Other',
    ],
    icon: Code,
  },
  {
    name: 'English',
    gradeLevels: [
      'Writing',
      'Reading Comprehension',
      'Proofreading',
    ],
    icon: LocalLibrary,
  },
  {
    name: 'ESL',
    gradeLevels: [
      'Introductory',
      'Intermediate',
      'Advanced',
    ],
    icon: Language,
  },
  {
    name: 'Languages',
    gradeLevels: [
      'Spanish',
      'French',
      'German',
      'Russian',
      'Italian',
      'Cantonese',
      'Mandarin',
      'English',
    ],
    icon: Language,
  },
  {
    name: 'Music',
    gradeLevels: [
      'Guitar',
      'Vocal',
      'Piano',
      'Drums',
    ],
    icon: MusicNote,
  },
]
export const SUBJ_TO_GRADES = SUBJECTS.reduce(
  (acc, s) => {
    acc[s.name] = s.gradeLevels
    return acc
  },
  {}
)
export const SUBJ_TO_ICONS = SUBJECTS.reduce(
  (acc, s) => {
    acc[s.name] = s.icon
    return acc
  },
  {}
)

export const VALID_EMAIL_REGEX = /^([a-zA-Z0-9_\-\.\+]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/

export const RATE_OPTIONS = [
  "Select Price Range",
  "$  10 - 30",
  "$  30 - 50",
  "$  50 - 120",
]

export const SEARCH_RADIOUS = [
  "Select Radious",
  "5",
  "10",
  "20",
  "50"
]



