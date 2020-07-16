const CODES = {
  A: 65,
  Z: 90
}

function toCell() {
  return `
    <div class="cell" contenteditable></div>
  `
}

// принимает параметр col и вставляет его в html разметку
function toColumn(col) {
  return `
    <div class="column">${col}</div>
  `
}


function createRow(index, content) {
  return `
  <div class="row">
  <div class="row-info">${index ? index : ''}</div>
    <div class="row-data">${content}</div>
  </div>
  `
}
// переобразовует число в букву. 
function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}


// експортируем функцию в скобках указано количество строк таблицы
export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1 // хранит число(количество столбцов)
  const rows = []

  // создали новый массив и в скобках указали количество елементов массива
  const cols = new Array(colsCount)
      .fill('')// вывили в каждый елемент массива пустую строку 
      .map(toChar)// вывили в каждый елемент массива букву от A до Z
      .map(toColumn)// вставили в каждый елемент массива html разметку с буквами
      .join('')// приводим массив к строке после чего cols уже
      // не массив а строка
  
  
  // в массив rows в начало добавили html разметку(строку с буквами )
  rows.push(createRow(null, cols))

  // с помощу цыкла сгенерировали htmlразметку строк
  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount)
        .fill(' ')
        .map(toCell)
        .join('')

    rows.push(createRow(i + 1, cells))
  }
  console.log(rows)

  return rows.join('')
}
