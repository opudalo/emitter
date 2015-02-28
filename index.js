var emitters = {}

export function register(name = false, ctx = window){
  if (!name) return 
  
  emitters[name] = {
    name: name,
    ctx: ctx,
    messages: {}
  }
}

export function emit(message, ...data) {
  var [name, event] = message.split(':')
    , emitter = emitters[name]
    , callbacks = getCallbacks(emitter, message)
  
  if (!emitter || !callbacks) return
  for (var cb of callbacks) cb.apply(emitter.ctx, data)
}

export function off(message, cb) {
  var [name, event] = message.split(':')
    , emitter = getEmitter(name)
    , callbacks = getCallbacks(emitter, message)
    , index = callbacks.indexOf(cb)
  if (index != -1) callbacks.splice(index, 1)
}

export function on(message, cb) {
  var [name, event] = message.split(':')
    , emitter = getEmitter(name)
    , callbacks = getCallbacks(emitter, message)

  callbacks.push(cb)
}

export function one(message, cb) {
  on(message, _cb)
     
  function _cb(...data) {
    off(message, _cb)
    cb.apply(this, data)
  }
}

export { one as once }

function getEmitter(name) {
  if (!emitters[name]) register(name)
  return emitters[name]
}

function getCallbacks(emitter, message) {
  var callbacks = emitter.messages
    callbacks[message] = callbacks[message] || []

  return callbacks[message]
}
