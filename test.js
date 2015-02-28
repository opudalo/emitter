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

describe('emitter basics', function() {
  it('emitter registration', function(done) {
    emitter.register('cat', cat)
    done()
  })

  it('listeners registration', function(done) {
    emitter.on('cat:changeName', cat.setName)
    emitter.one('cat:changeColor', cat.setColor)
    
    done()
  })

  it('listener called on emit', function () {
    emitter.emit('cat:changeName', 'Marvel')
    expect(cat.name).to.equal('Marvel')
    emitter.emit('cat:changeName', 'Murzik')
    expect(cat.name).to.equal('Murzik')
  })

  it('one-temi listener removed after emit', function () {
    emitter.emit('cat:changeColor', 'Mixed')
    expect(cat.color).to.equal('Mixed')
    
    emitter.emit('cat:changeColor', 'Red')
    expect(cat.color).to.equal('Mixed')
  })

  it('off removes listener', function () {
    expect(cat.name).to.equal('Murzik')
    emitter.off('cat:changeName', cat.setName)
    emitter.emit('cat:changeName', 'Johny')
    expect(cat.name).to.equal('Murzik')
  })
})
