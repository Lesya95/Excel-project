import {$} from '@core/dom'

export function resizeHandler($root, event) {
  // хранит елемент ресайза на который кликнули
  const $resizer = $(event.target)
  // находим родителя с атрибутом data-type="resizable"
  const $parent = $resizer.closest('[data-type="resizable"]')
  // координаты елемента родителя который resizer
  const coords = $parent.getCoords()
  // хранит значение data-resize
  const type = $resizer.data.resize
  let value

  if (type === 'col') {
    $resizer.css({
      opacity: 1,
      height: '100vh'
    })
  } else {
    $resizer.css({
      opacity: 1,
      width: '100vw'
    })
  }
  
  /* mousemove Событие вызывается элементом , когда указательное
  устройство (обычно мышь) перемещается в то время как горячая
  точка курсора находится внутри него.*/
  document.onmousemove = e => {
    // если data-resize="col" то ресайз по оси х
    if (type === 'col') {
      /* coords.right - координата елемента  ресайза при клике на 
      елем. e.pageX  -  координата движения миши по х. В delta 
      растояние пройденное мишью. value - значение на сколько 
      увеличить ячейку при ресайзе*/
      const delta = e.pageX - coords.right
      value = coords.width + delta
      // уст. css свойство координаты ресайза
      $resizer.css({right: -delta + 'px'})
    } else { // иначе ресайз по оси y
      /* delta - получение растояния пройденное мишью по оси y.
      value - значение на сколько увеличить высоту строки при ресайзе*/
      const delta = e.pageY - coords.bottom
      value = coords.height + delta
      $resizer.css({bottom: -delta + 'px'})
    }
  }

  /* при отпускании мыши убираем событие onmousemove и onmouseup 
  после выполнения*/
  document.onmouseup = () => {
    document.onmousemove = null
    document.onmouseup = null

    if (type === 'col') {
      /* находим все елементы которые имееют атрибут data-col со 
      значением которое есть у родителя елемента на которыкликнули*/
      const cells = $root.findAll(`[data-col="${$parent.data.col}"]`)
      /* в стилях меняем ширину яцеки родителя ресайза после 
      отпускания мыши после в стилях меняем ширину всех яцеек 
      у которых дата атрибут такойже как и у родителя ресайза*/
      $parent.css({width: value + 'px'}) 
      cells.forEach(el => el.style.width = value + 'px')
      /* уст. стили для ресайза колонок после отпуск мыши*/
      $resizer.css({
        opacity: 0,
        right: 0,
        height: 'inherit'
      })
    } else {
      // в стилях меняем высоту строки при ресайзе
      $parent.css({height: value + 'px'})
      // уст стили для ресайза строк после отпуск мыши
      $resizer.css({
        opacity: 0,
        bottom: 0,
        width: 'inherit'
      })
    }
  }
}
