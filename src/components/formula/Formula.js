import {ExcelComponent} from '@core/ExcelComponent'

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click']
    })
  }
<<<<<<< HEAD

=======
  
>>>>>>> b5fdccd6b6b3a9332149b0dc027af516e35a4da2
  toHTML() {
    return `
    <div class="info">fx</div>
    <div class="input" contenteditable spellcheck="false"></div>
    `
  }

  onInput(event) {
    console.log(this.$root)
<<<<<<< HEAD
    console.log('Formula onInput', event.target.textContent.trim())
=======
    console.log('Formula onInput', event.target.textContent.trim()) 
>>>>>>> b5fdccd6b6b3a9332149b0dc027af516e35a4da2
  }

  onClick() {
    console.log('mk')
  }
}
<<<<<<< HEAD
=======


>>>>>>> b5fdccd6b6b3a9332149b0dc027af516e35a4da2
