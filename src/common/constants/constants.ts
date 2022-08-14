import { IWordsRequest } from '../../features';
import { UserWordStatus } from '../enums/enums';

export const BASE_URL: string = import.meta.env.PROD
  ? import.meta.env.VITE_API_URL_DEV
  : import.meta.env.VITE_API_URL_DEV;

export const WORDS_PER_PAGE_MAX = 20;
export const WORDS_PER_PAGE_MIN = 1;
export const GROUP_COUNT = 6;
export const PAGE_COUNT = 30;

export const LOCALSTORAGE_KEY_USER = 'user';
export const LOCALSTORAGE_KEY_ID = 'newAccount';

export const MESSAGES = Object.freeze({
  signUp: {
    success: 'User Register Successfully',
    error: 'Wrong registration data',
  },
  signIn: {
    success: 'User Login Successfully',
    error: 'Invalid email or password',
  },
  validation: {
    name: 'Name must be at least 2 characters',
    email: 'Please enter a valid email address',
    password: 'Password must be at least 8 characters',
    required: {
      name: 'Name is required',
      email: 'Email is required',
      password: 'Password is required',
    },
  },
});

export const ROUTES = {
  main: {
    url: '/',
    title: 'Главная страница',
  },
  auth: {
    url: '/auth',
    title: 'Авторизация',
  },
  statistics: {
    url: 'statistics',
    title: 'Статистика',
  },
  settings: {
    url: 'settings',
    title: 'Настройки',
  },
  aboutTeam: {
    url: 'about-team',
    title: 'О команде',
  },
  dictionary: {
    url: 'dictionary',
    title: 'Словарь',
    pages: {
      studied: {
        url: '/dictionary/studied',
        title: 'Изучаемые слова',
      },
      deleted: {
        url: '/dictionary/deleted',
        title: 'Удаленные слова',
      },
      difficult: {
        url: '/dictionary/difficult',
        title: 'Сложные слова',
      },
    },
  },
  games: {
    url: 'games',
    title: 'Игры',
    pages: {
      sprint: {
        url: '/games/sprint',
        title: 'Спринт',
      },
      audiocall: {
        url: '/games/audiocall',
        title: 'Аудиовызов',
      },
    },
  },
  textbook: {
    url: 'textbook',
    title: 'Учебник',
    pages: {
      list: {
        url: '/textbook/:group/:page',
        title: 'Учебник',
      },
    },
  },
};

export const API = Object.freeze({
  auth: {
    getUrl: () => 'signin',
  },
  user: {
    getUrl: (id?: string) => `users/${id || ''}`,
  },
  settings: {
    getUrl: (id: string) => `users/${id}/settings`,
  },
  statistics: {
    getUrl: (id: string) => `users/${id}/statistics`,
  },
  aggregatedWords: {
    getUrl: (id: string) => `users/${id}/aggregatedWords`,
  },
  userWords: {
    getUrl: (id: string, wordId?: string) => `users/${id}/words/${wordId || ''}`,
  },
  words: {
    getUrl: (id: string, query?: IWordsRequest) =>
      query
        ? `words?${query.page && `page=${query.page}`}${query.group && `&group=${query.group}`}`
        : `words/${id}`,
  },
});

class Filter {
  private difficultyHard = `{"userWord.difficulty":"${UserWordStatus.HARD}"}`;

  private difficultyWork = `{"userWord.difficulty":"${UserWordStatus.WORK}"}`;

  private difficultyDelete = `{"userWord.difficulty":"${UserWordStatus.DELETE}"}`;

  readonly count = `{"$or":[${this.difficultyWork},${this.difficultyHard}]}`;

  readonly active = `{"$or":[${this.difficultyWork},${this.difficultyHard},${this.difficultyDelete},{"userWord":null}]}`;

  dictionary(difficulty: UserWordStatus) {
    return `{"$or":[{"userWord.difficulty":"${difficulty}"}${
      difficulty === UserWordStatus.WORK ? `,${this.difficultyHard}` : ''
    }]}`;
  }
}

export const FILTER_PARAMS = new Filter();
