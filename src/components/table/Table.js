import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template'
import {resizeHandler} from '@/components/table/table.resize'
import {TableSelection} from '@/components/table/TableSelection'
import {$} from '@core/dom'
import {
  shouldResize,
  isCell,
  matrix,
  nextSelector
} from '@/components/table/table.functions'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
      // listeners: ['click', 'mousedown', 'mousemove', 'mouseup']
    })
  }

  toHTML() {
    return createTable(30)
  }

  prepare() {
    // this.selection - обект(инстанс класса TableSelection)
    this.selection = new TableSelection()
  }

  init() {
    super.init() // указываем родительский метод чтобы его не перезаписать
    this.selectCell(this.$root.find('[data-id="0:0"]'))
    /* подписка на событие formula:input которое предоставляет текст из
    формулы который передайом в текущей выделенный елемент(ячейка) current*/
    this.$on('formula:input', text => {
      this.selection.current.text(text)
    })
    /* подпис на событие formula:done после его уведомления фокус
     перемещаеться в активный елемент(ячейку)*/
    this.$on('formula:done', () => {
      this.selection.current.focus()
    })
  }

  selectCell($cell) {
    /* обращаемся к обекту(инстанс класса TableSelection).вызываем у него
     метод select и передаем в него елемент $cell который нашли выше*/
    this.selection.select($cell)
    this.$emit('table:select', $cell)
  }

  // Событие mousedown срабатывает, когда кнопка указывающего
  // устройства (к примеру, мыши) нажата над элементом.
  onMousedown(event) {
    // если у елем на который кликают есть атрибут data-resize то{...}
    if (shouldResize(event)) {
      // функция ресайза елементов(ячеек)
      resizeHandler(this.$root, event)
      // если у елем есть data-type="cell" то {...}
    } else if (isCell(event)) { 
      // елем-ячейка (инстанс класса дом) на который кликнули
      const $target = $(event.target)
      this.selectCell($target)
      // если зажат shift то выделяеться группа елем(ячеек)
      if (event.shiftKey) {
        /* функция matrix возвращает массив с индексами елем(ячеек)
         которые нужно выделить. у етого массива мы вызываем map
         который переобразовует массив индексов в новый массив
         елементов дом дерева с этими же индексами */
        const $cells = matrix($target, this.selection.current)
            .map(id => this.$root.find(`[data-id="${id}"]`))
        
        /* у обьекта this.selection вызыв метод selectGroup в
         который передаем массив елементов. selectGroup добавляет
         в каждый елемент массива класс selected(который
         добавляет стили ячейкам)*/
        this.selection.selectGroup($cells)

        // }иначе{ добавл одиному елем(ячейка) класс selected}
      } else { 
        this.selection.select($target)
      }
    }
  }

  onKeydown(event) {
    // массив событий
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown'
    ]

    // тоже самое что и const key = event.key 
    const {key} = event

    // если в массиве keys имееться собитие(key) которое происходит то {...}
    if (keys.includes(key) && !event.shiftKey) {
      // у event отменяем стандартное поведение при событии(key)
      event.preventDefault()
      // хранится выделенный елемент(ячейка)
      const id = this.selection.current.id(true)
      // получаем инстанс класса дом с елементом(ячейкой) на который переходим
      const $next = this.$root.find(nextSelector(key, id))
      /* выделяем елемент(ячейку) на который переходим и содержимое передаем
       в поле формулы*/
      this.selectCell($next)
    }
  }

  /* уведомляет о событии table:input и передаёт обьект елемента-ячейки(инстанс
   класса дом) в который вводили текст*/
  onInput(event) {
    this.$emit('table:input', $(event.target))
  }
}

