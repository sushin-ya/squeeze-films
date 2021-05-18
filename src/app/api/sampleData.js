import Frank from '../images/users/1_Frank.jpg';
import Ronald from '../images/users/2_Ronald.jpg';
import Crystal from '../images/users/3_Crystal.jpg';

import showshank from '../images/films/1_showshank.jpg';
import godfather from '../images/films/2_godfather.jpg';
import twelveangrymen from '../images/films/3_12angrymen.jpg';
import darknight from '../images/films/4_darknight.jpg';
import pulpfiction from '../images/films/5_pulpfiction.jpg';
import ganman from '../images/films/6_ganman.jpg';
import list from '../images/films/7_list.jpg';
import fightclub from '../images/films/8_fightclub.jpg';
import inception from '../images/films/9_inception.jpg';
import loadoftherings from '../images/films/10_loadoftherings.jpg';

export const sampleData = [
  {
    id: '1',
    name: 'Frank',
    photoURL: Frank,
    films: [
      { id: 1, photoURL: showshank },
      { id: 2, photoURL: godfather },
      { id: 3, photoURL: twelveangrymen },
      { id: 4, photoURL: darknight },
      { id: 5, photoURL: pulpfiction },
      { id: 6, photoURL: ganman },
      { id: 7, photoURL: list },
      { id: 8, photoURL: fightclub },
      { id: 9, photoURL: inception },
      { id: 10, photoURL: loadoftherings },
    ],
  },
  {
    id: '2',
    name: 'Ronald',
    photoURL: Ronald,
    films: [
      { id: 1, photoURL: showshank },
      { id: 2, photoURL: godfather },
      { id: 3, photoURL: twelveangrymen },
      { id: 4, photoURL: darknight },
      { id: 5, photoURL: pulpfiction },
      { id: 6, photoURL: ganman },
      { id: 7, photoURL: list },
      { id: 8, photoURL: fightclub },
      { id: 9, photoURL: inception },
      { id: 10, photoURL: loadoftherings },
    ],
  },
  {
    id: '3',
    name: 'Crystal',
    photoURL: Crystal,
    films: [
      { id: 1, photoURL: showshank },
      { id: 2, photoURL: godfather },
      { id: 3, photoURL: twelveangrymen },
      { id: 4, photoURL: darknight },
      { id: 5, photoURL: pulpfiction },
      { id: 6, photoURL: ganman },
      { id: 7, photoURL: list },
      { id: 8, photoURL: fightclub },
      { id: 9, photoURL: inception },
      { id: 10, photoURL: loadoftherings },
    ],
  },
];

export const popularFilms = [
  {
    id: 1,
    photoURL: showshank,
    title: 'ショーシャンクの空に',
    release: '1994',
  },
  { id: 2, photoURL: godfather, title: 'ゴッド・ファーザー', release: '1972' },
  { id: 3, photoURL: twelveangrymen, title: '十二の怒れる男', release: '1957' },
  { id: 4, photoURL: darknight, title: 'ダークナイト', release: '2008' },
  {
    id: 5,
    photoURL: pulpfiction,
    title: 'パルプ・フィクション',
    release: '1994',
  },
  { id: 6, photoURL: ganman, title: '続・夕陽のガンマン', release: '1996' },
  { id: 7, photoURL: list, title: 'シンドラーのリスト', release: '1994' },
  { id: 8, photoURL: fightclub, title: 'ファイトクラブ', release: '1999' },
  { id: 9, photoURL: inception, title: 'インセプション', release: '2010' },
  {
    id: 10,
    photoURL: loadoftherings,
    title: 'ロード・オブ・ザ・リング',
    release: '2001',
  },
];
