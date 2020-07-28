import {range} from '@core/utils'

// фун возвр. значение data-resize елемента
export function shouldResize(event) {
  return event.target.dataset.resize
}

// проверяет елемент на наличие data-type="cell"
export function isCell(event) {
  return event.target.dataset.type === 'cell'
}

// возвращает массив индексов елементов(ячеек) которые нужно выделить
export function matrix($target, $current) {
  // обект с ключами row и coll c их id, ячейки на котор клик
  const target = $target.id(true) // id ячейки на который клик. с зажатым shift

  // обект с ключами row и coll c их id, текущей выбраной ячейки
  const current = $current.id(true) // id текуще выбранного елем(ячейки)

  // получаем массив всех ячеек по колоноке которые нужно выбрать
  const cols = range(current.col, target.col) 

  // получаем массив всех ячеек по строке которые нужно выбрать
  const rows = range(current.row, target.row)

  /* соеденяем два массива cols и rows так чтобы на выходе вернуть массив с
   индексами елементов(ячеек) которые нужно выделить */
  return cols.reduce((acc, col) => {
    rows.forEach(row => acc.push(`${row}:${col}`))
    return acc
  }, [])
}

// функция определяет на который елемент нужно перейти при срабатывании события
export function nextSelector(key, {row, col}) {
  const MIN_VALUE = 0
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row++
      break
    case 'Tab':
    case 'ArrowRight':
      col++
      break
    case 'ArrowUp':
      row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1
      break
    case 'ArrowLeft':
      col = col - 1 < MIN_VALUE ? MIN_VALUE : col - 1
      break
  }
  // возврашает селектор елемента на который переходим при событии
  return `[data-id="${row}:${col}"]`
}

