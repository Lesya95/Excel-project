import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template'
import {resizeHandler} from '@/components/table/table.resize'
import {shouldResize} from '@/components/table/table.functions'


export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: ['mousedown']
      // listeners: ['click', 'mousedown', 'mousemove', 'mouseup']
    })
  }

  toHTML() {
    return createTable(30)
  }

  // onClick() {
  //   console.log('click')
  // }


  // Событие mousedown срабатывает, когда кнопка указывающего
  // устройства (к примеру, мыши) нажата над элементом.
  onMousedown(event) {
    // если у елем на который кликают есть атрибут data-resize то{...}
    if (shouldResize(event)) {
      resizeHandler(this.$root, event)
    }
  }

  // onMousemove() {
  //   console.log('mousemove')
  // }

  // onMouseup() {
  //   console.log('mouseup')
  // }
}
