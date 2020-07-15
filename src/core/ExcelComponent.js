import {DomListener} from '@core/DomListener'

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || '' // обращение к статическому полю
    // в котором храниться имя класса компонента
  }
  // Возвращает шаблон компонента
  toHTML() {
    return ''
  }
  // сокращенная форма добаления события
  init() {
    this.initDOMListeners()
  }
  // сокращенная форма удаления события
  destroy() {
    this.removeDOMListeners()
  }
}
