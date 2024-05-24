const list = [
  { pid: null, id: 1, data: "1" },
  { pid: 1, id: 12, data: "1-2" },
  { pid: 1, id: 13, data: "1-3" },
  { pid: 12, id: 124, data: "1-2-4" },
  { pid: 13, id: 132, data: "1-3-2" },
  { pid: 124, id: 1246, data: "1-4-6" },
  { pid: null, id: 2, data: "2" },
  { pid: 2, id: 21, data: "2-1" },
  { pid: 2, id: 22, data: "2-2" },
  { pid: 21, id: 211, data: "2-1-1" },
  { pid: 21, id: 212, data: "2-1-2" },
];

const newList = [
  {
    pid: null,
    id: 1,
    data: "1",
    children: [
      {
        pid: 1,
        id: 2,
        data: "2-1",
        children: [
          {
            pid: 2,
            id: 4,
            data: "3-1",
            children: [
              {
                pid: 4,
                id: 6,
                data: "4-1",
                children: [],
              },
            ],
          },
        ],
      },
      {
        pid: 1,
        id: 3,
        data: "2-2",
        children: [
          {
            pid: 3,
            id: 5,
            data: "3-2",
            children: [],
          },
        ],
      },
    ],
  },
]

function listToTree(list, id=null, idName="id", pidName="pid", childrenName="children") {
  return list.reduce((acc, curr) => {
    if (id === curr[pidName]) {
      curr[childrenName] = listToTree(list, curr[idName])?.length ? listToTree(list, curr[idName]) : undefined
      return [...acc, curr]
    }
    return acc
  }, [])
}

function listToTree2(
  list,
  rootId = null,
  idName="id", pidName="pid", childrenName="children"
) {
  const record = {}; // 用空间换时间，用于将所有项的 id 及自身记录到字典中
  const root = [];

  list.forEach((item) => {
    const currentId = item[idName]
    const parentId = item[pidName]

    record[currentId] = !record[currentId] ? item : { ...record[currentId], ...item };

    const treeItem = record[currentId];

    if (item[pidName] === rootId) {
      root.push(item);
    } else {
      if (!record[parentId]) {
        record[parentId] = {};
      }

      if (!record[parentId][childrenName]) {
        record[parentId][childrenName] = [];
      }

      record[parentId][childrenName].push(treeItem);
    }
  });

  return root;
}

function listToTree3(
  list,
  rootId = null,
  idName="id", pidName="pid", childrenName="children"
) {
  const record = {}; // 用空间换时间，用于将所有项的 id 及自身记录到字典中
  const root = [];

  list.forEach((item) => {
    const newItem = Object.assign({}, item)
    const currentId = newItem[idName]
    const parentId = newItem[pidName]

    newItem[childrenName] = record[currentId] ? record[currentId] : (record[currentId] = [])
    // { pid: null, id: 1, data: "1", children: [] }
    // { pid: 1, id: 12, data: "1-2" , children: [] }

    console.log('newItem', newItem);
    console.log('record', record);


    if (parentId === rootId) {
      root.push(newItem);
    } else {
      if (!record[parentId]) {
        record[parentId] = [];
      }

      record[parentId].push(newItem);
    }
  });

  return root;
}

console.time()
listToTree(list)
console.timeEnd()


console.time()
listToTree2(list)
console.timeEnd()

console.time()
listToTree3(list)
console.timeEnd()
