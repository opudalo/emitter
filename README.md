# emitter

Everyone should have emitter. So do I. 

## Installation

    $ bower install --save zheneva/emitter
    or 
    $ npm install --save zheneva/emitter

## Examples

```js
import * as emitter from './index'
import {expect} from 'chai'

var cat = {
  name: 'Ruzhyi',
  color: 'Black',
  setName: function (name) {
    this.name = name
  },
  setColor: function (color) {
    this.color = color
  }
}

emitter.register('cat', cat)

emitter.on('cat:changeName', cat.setName)
emitter.emit('cat:changeName', 'Marvel') // cat.name = "Marvel" 
emitter.emit('cat:changeName', 'Murzik') // cat.name = "Murzik"

emitter.one('cat:changeColor', cat.setColor)

emitter.emit('cat:changeColor', 'Mixed') // cat.color = "Mixed"
emitter.emit('cat:changeColor', 'Red') // will not change color

emitter.off('cat:changeName', cat.setName)
emitter.emit('cat:changeName', 'Murzik') // will not change name

```
