# Welcome to Shine! 🌟

The purpose of this project is to connect students with excellent teachers.

Eventually, we would like to provide search recommendations that match you with people who "get" you, right away.

## Project Goals

- maintain Rails views for admin-only views; React for user-facing views

## Project Milestones

- V0: Tutor can apply, Parent can request a Tutor
- V1: Parent can select own tutor on-site, Parent can Hire tutor, Tutor can Report Lesson and be paid

## Development Process

Release Process:
- Please use feature branches
- Any commits to master should be deployable

Estimation:
- 0 points: 30minutes - 1 hour
- 1 point: 1 hour - 4 hours
- 2 points: 4 hours - 8 hours
- 3 points: 1+ days (if possible, break down into smaller stories)


## Development

### Dev Setup

1. `bundle`
1. `yarn install`
1. `foreman start -f Procfile.dev-server`

### Deployment

Hosted on Heroku. No prod DNS yet.

- [https://shine-stg.herokuapp.com/](https://shine-stg.herokuapp.com/) - auto-deployed on push to `master`
- [https://shine-prod.herokuapp.com/](https://shine-prod.herokuapp.com/) - manually promoted via [Heroku dashboard](https://dashboard.heroku.com/pipelines/f9a280ed-7e82-4b5a-b9ed-99b447f59ce1)

#### Debugging Deploys

- delete public/assets if it is compiled locally; Heroku detects the Sprockets manifest in `public/assets/.sprockets-[fingerprint]` to decide whether to compile the assets (ie run webpack compile) on deploy. If it sees the manifest, it skips compiling Webpack

### ReactOnRails setup

ReactOnRails has been useful for development, particularly for the flexibility of using Rails views where possible. It also provides server-side rendering. It's not the best documented, though; here are some docs.

- [Installation Overview](https://github.com/shakacode/react_on_rails/blob/master/docs/basics/installation-overview.md)
- [How it Works (Technical Explanation)](https://github.com/shakacode/react_on_rails#how-it-works)
- [Documentation Gitbook - Whoo!](https://shakacode.gitbooks.io/react-on-rails/content/)
- [Heroku Deployment](https://github.com/shakacode/react_on_rails/blob/master/docs/additional-reading/heroku-deployment.md#more-details-on-precompilation-using-webpack-to-create-javascript-assets)

### ReactOnRails - Adding a new Component

Long story short, you have to expose your React components to Rails to have them passed into the `react-on-rails` JS helper (NPM package)
- [Globally exposing a React component](https://github.com/shakacode/react_on_rails#globally-exposing-your-react-components)
- [Configuring a Redux store](https://github.com/shakacode/react_on_rails#redux_store)
- [Rails CSRF from the JS side (Nice!)](https://github.com/shakacode/react_on_rails#using-rails-built-in-csrf-protection-in-javascript)
- [React-Router](https://github.com/shakacode/react_on_rails#react-router)
