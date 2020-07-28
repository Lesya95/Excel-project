import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom'

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options
    })
  }
  
  toHTML() {
    return `
    <div class="info">fx</div>
    <div id="formula" class="input" contenteditable spellcheck="false"></div>
    `
  }

  init() {
    super.init()

    // находим елемент с id=formula  в домдереве
    this.$formula = this.$root.find('#formula')
    /* подписываемся на событие table:select которое передает текст из
     ячейки($cell) и вставляем этот текст в елемент с id=formula */
    this.$on('table:select', $cell => {
      this.$formula.text($cell.text())
    })

    // подписка на событие table:input которое передает ячейку с контекстом
    this.$on('table:input', $cell => {
      // в поле формулы вставляем контекст ячейки
      this.$formula.text($cell.text())
    })
  }

  onInput(event) {
    /* уведомляет слушателя про событие formula:input которое отображает
     контент формулы*/
    this.$emit('formula:input', $(event.target).text())
  }

  // отменяет дифолтное поведениу если event.key - Enter или Tab
  onKeydown(event) {
    const keys = ['Enter', 'Tab']
    if (keys.includes(event.key)) {
      event.preventDefault()

      // уведомляем компонент который подписан на событие formula:done
      this.$emit('formula:done')
    }
  }
}
