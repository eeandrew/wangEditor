/**
 * strokeColor menu
 */

import $ from '../../util/dom-core.js'

function StrokeColor(editor) {
    this.editor = editor
    this.$elem = $(`<div class="w-e-menu">
            <i class="w-e-icon-strikethrough"></i>
        </div>`)
    this.type = 'click'
    this._active = false
}

StrokeColor.prototype = {
    onClick: function(e) {
        const editor = this.editor
        const $startElem = editor.selection.getSelectionStartElem()
        const $endElem = editor.selection.getSelectionEndElem()
        const $selectionElem = editor.selection.getSelectionContainerElem()
        const isSeleEmpty = editor.selection.isSelectionEmpty()
        const selectionText = editor.selection.getSelectionText()
        let shadowCSSContent = `text-shadow: 0px 0px 2px red,0px 0px 2px red`
        let strokText
        if(!isSeleEmpty) {
            //选取元素非空
            if($selectionElem[0].style['text-shadow']) {
                //已经被设置stoke
                $selectionElem[0].style.removeProperty('text-shadow')
            }else {
                strokText = $(`<span style="${shadowCSSContent}">${selectionText}</span>`)
                editor.cmd.do('insertElem', strokText)
                editor.selection.createRangeByElem(strokText, false)
                editor.selection.restoreSelection()
            }
            editor.selection.restoreSelection()
        }
    },
    tryChangeActive: function(e) {
        const editor = this.editor
        const $elem = this.$elem
        const $selectionELem = editor.selection.getSelectionContainerElem()
        if (!$selectionELem) {
            return
        }
        const $parentElem = $selectionELem.parent()
        if ($selectionELem[0].style['text-shadow']) {
            this._active = true
            $elem.addClass('w-e-active')
        } else {
            this._active = false
            $elem.removeClass('w-e-active')
        }
    }
}

export default StrokeColor