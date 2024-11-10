// {{id: '1', total: 100 }, {id: '2', total: 101}}
const examScores = [
  {
    id: '1',
    course: 'cs001',
    score: 90
  },
  {
    id: '1',
    course: 'cs002',
    score: 79
  },
  {
    id: '2',
    course: 'cs002',
    score: 57
  },
  {
    id: '3',
    course: 'cs001',
    score: 85
  },
  {
    id: '2',
    course: 'cs001',
    score: 74
  }
]

const computedTotalScore = examScores.reduce((acc, curr) => {
  const _target = acc.find(item => item.id === curr.id)

  if (_target) {
    _target.total += curr.score
  } else {
    acc.push({
      id: curr.id,
      total: curr.score
    })
  }

  return acc
}, [])

console.log(computedTotalScore)
