const templateData = {
  films: {},
  columns: {
    candidate: {
      id: 'candidate',
      title: '候補リスト',
      filmIds: [],
    },
    allTimeBest: {
      id: 'allTimeBest',
      title: 'オール・タイム・ベスト１０',
      filmIds: [],
    },
  },
  columnOrder: ['candidate', 'allTimeBest'],
};

export default templateData;
