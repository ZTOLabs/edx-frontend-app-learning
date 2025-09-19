import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  close: {
    id: 'general.altText.close',
    defaultMessage: 'Close',
    description: 'Text used as an aria-label to describe closing or dismissing a component',
  },
  registerLowercase: {
    id: 'learning.logistration.register', // ID left for historical purposes
    defaultMessage: 'register',
    description: 'Text in a link, prompting the user to create an account.  Used in "learning.logistration.alert"',
  },
  signInLowercase: {
    id: 'learning.logistration.login', // ID left for historical purposes
    defaultMessage: 'sign in',
    description: 'Text in a link, prompting the user to log in.  Used in "learning.logistration.alert"',
  },
  signInSentenceCase: {
    id: 'general.signIn.sentenceCase',
    defaultMessage: 'Sign in',
    description: 'Text in a button, prompting the user to log in.',
  },
  pageNotFoundHeader: {
    id: 'learning.pageNotFound.header',
    defaultMessage: 'Page not found',
    description: 'Text for header notifying them that the page is not found',
  },
  pageNotFoundBody: {
    id: 'learning.pageNotFound.body',
    defaultMessage: 'The page you you were looking for was not found. Go back to the {homepageLink}.',
    description: 'Text for body, prompting the user to go back to the home page',
  },
  homepageLink: {
    id: 'learning.pageNotFound.body.homepageLink.label',
    defaultMessage: 'homepage',
    description: 'Text for url, telling them the page they will be navigated to',
  },
  profile: {
    id: 'learning.navigation.profile.label',
    defaultMessage: 'Profile',
    description: 'The accessible label for profile navigation',
  },
  logOut: {
    id: 'learning.navigation.logOut.label',
    defaultMessage: 'Log out',
    description: 'The accessible label for log out navigation',
  },
  home: {
    id: 'learning.navigation.home.label',
    defaultMessage: 'Home',
    description: 'The accessible label for home navigation',
  },
  courses: {
    id: 'learning.navigation.courses.label',
    defaultMessage: 'Courses',
    description: 'The accessible label for courses navigation',
  },
  discover: {
    id: 'learning.navigation.discover.label',
    defaultMessage: 'Discover',
    description: 'The accessible label for discover navigation',
  },
});

export default messages;
