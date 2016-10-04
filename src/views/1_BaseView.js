(function(NS) {
    'use strict';
    class BaseView {
        constructor() {
            this.el = this.createEl();
            this._handlers = {};
            this._timeouts = {};
        }

        setTimeout(timeout, cb) {
            var id = setTimeout(() => {
                this.clearTimeout(id);
                cb();
            }, timeout);
            this._timeouts[id] = cb;
        }

        clearTimeout(id) {
            clearTimeout(id);
            delete this._timeouts[id];
        }

        remove() {
            this.el.remove();
            for (var k in this._timeouts) if (this._timeouts.hasOwnProperty(k)) {
                this.clearTimeout(k);
            }
        }

        on(eventName, handler) {
            var handlers;
            if (!(handlers = this._handlers[eventName])) {
                this._handlers[eventName] = handlers = [];
            }

            if (~handlers.indexOf(handler)) {
                return;
            }

            handlers.push(handler);

        }

        off(eventName, handler) {
            if (handler == null) {
                delete this._handlers[eventName];
            } else {
                var handlers;
                if ((handlers = this._handlers[eventName])) {
                    var handlerIndex = handlers.indexOf(handler);
                    if (~handlerIndex) {
                        handlers.splice(handlerIndex, 1);
                    }
                }
            }
        }

        trigger(eventName, ...args) {
            var handlers = this._handlers[eventName];
            if (handlers) {
                handlers.forEach((handler) => handler.apply(null, args));
            }
        }
    }
    NS.BaseView = BaseView;
})(Book);
