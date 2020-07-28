import {$} from '@core/dom'
import {Emitter} from '@core/Emitter'

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector)
    this.components = options.components || []
    // обьек(инстанс класса) в котором храняться подписки на собития с их fn
    this.emitter = new Emitter()
  }

  getRoot() {
    const $root = $.create('div', 'excel')

    // хранит в себе обьект с подписками и их функциями
    const componentOptions = {
      emitter: this.emitter
    }

    this.components = this.components.map(Component => {
      const $el = $.create('div', Component.className)
      const component = new Component($el, componentOptions)
      $el.html(component.toHTML())
      $root.append($el)
      return component
    })

    return $root
  }

  render() {
    this.$el.append(this.getRoot())
    this.components.forEach(component => component.init())
  }

  //   удаления события, удаляем компоненты, чистим слушатели
  destroy() {
    this.components.forEach( component => component.destroy())
  }
}
