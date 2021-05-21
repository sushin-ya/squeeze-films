import showshank from '../../../app/images/films/1_showshank.jpg';
import godfather from '../../../app/images/films/2_godfather.jpg';
import twelveangrymen from '../../../app/images/films/3_12angrymen.jpg';
import darknight from '../../../app/images/films/4_darknight.jpg';

const initialData = {
  films: {
    'film-1': {
      id: 'film-1',
      title: 'ショーシャンクの空に',
      photoURL: showshank,
      release: '1994',
      director: 'フランク・ダラボン',
      description: '映画の説明文',
    },
    'film-2': {
      id: 'film-2',
      photoURL: godfather,
      title: 'ゴッド・ファーザー',
      release: '1972',
      director: 'フランシス・フォード・コッポラ',
      description: '映画の説明文',
    },
    'film-3': {
      id: 'film-3',
      photoURL: twelveangrymen,
      title: '十二の怒れる男',
      release: '1957',
      director: 'シドニー・ルメット',
      description: '映画の説明文',
    },
    'film-4': {
      id: 'film-4',
      photoURL: darknight,
      title: 'ダークナイト',
      release: '2008',
      director: 'クリストファー・ノーラン',
      description: '映画の説明文',
    },
  },
  columns: {
    candidate: {
      id: 'candidate',
      title: '候補リスト',
      filmIds: ['film-1', 'film-2', 'film-3', 'film-4'],
    },
    allTimeBest: {
      id: 'allTimeBest',
      title: 'オール・タイム・ベスト１０',
      filmIds: [],
    },
  },
  columnOrder: ['candidate', 'allTimeBest'],
};

export default initialData;
