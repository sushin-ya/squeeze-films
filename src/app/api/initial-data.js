const initialData = {
  films: {
    'film-1': { id: 'film-1', content: 'Take out the garbage' },
    'film-2': { id: 'film-2', content: 'Watch my favorite show' },
    'film-3': { id: 'film-3', content: 'Charge my phone' },
    'film-4': { id: 'film-4', content: 'Cook dinner' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: '候補リスト',
      filmIds: ['film-1', 'film-2', 'film-3', 'film-4'],
    },
    'column-2': {
      id: 'column-2',
      title: 'オール・タイム・ベスト１０',
      filmIds: [],
    },
  },
  columnOrder: ['column-1', 'column-2'],
};

export default initialData;
