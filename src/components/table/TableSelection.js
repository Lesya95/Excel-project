export class TableSelection {
  static className = 'selected'
  constructor() {
    // храним выбранные ячейки в массиве
    this.group = []
    /* хранит елемент(ячейка) преведущего нажатия(текущая ячейка). по
     умолчанию null*/
    this.current = null
  }

  /* в метод передается одна ячейка, которой добавляеться класс selected.
   $el инстанс класса дом*/
  select($el) {
    /* проходит по массиву елементов(ячеек) и удаляет у елем. класс после
     чего массив очишаеться*/
    this.clear()
    // переданному елементу(ячейке) добавляеться класс selected + фокус
    $el.focus().addClass(TableSelection.className)
    // в массив this.group добаляеться переданный елемент(ячейка)
    this.group.push($el)
    // хранит текущий елемент(ячейка).
    this.current = $el
  }

  // чистка массива this.group 
  clear() {
    /* проходит цыклом по массиву елементов(ячеек) и у них удаляет класс
     selected*/ 
    this.group.forEach($el => $el.removeClass(TableSelection.className))
    // очишает массив елементов (ячеек)
    this.group = []
  }
  // выбираем группу ячеек
  selectGroup($group = []) {// приним. массив елем(ячеек)
    this.clear()// чисти массив

    // this.group являеться переданным массивом елементов(ячеек)
    this.group = $group 
    // проходим по массиву елем(ячеек)и добавляем им класс selected
    this.group.forEach($el => $el.addClass(TableSelection.className))
  }
}
