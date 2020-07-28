export function capitalize(string) {
  if (typeof string !== 'string') {
    return ''
  }

  return string.charAt(0).toUpperCase() + string.slice(1)
}

// возврашает массив с индексамми диапазонна ячеек которые нужно выбрать
export function range(start, end) {
  // условие для того чтобы небыло ошибки когда появиться отрицательный индекс
  if (start > end) {
    [end, start] = [start, end]
  }
  return new Array(end - start + 1) // созд массив с длиной перед ячеек
      .fill('') // заполняем массив пустой строкой
      .map((_, index) => start + index) // переобразов массив в массив индексов 
}
