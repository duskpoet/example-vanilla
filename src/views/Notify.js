(function(NS) {
    'use strict';

    const HIDE_TIMEOUT = 5000;

    class Notify extends NS.BaseView {
        createEl() {
            var div = document.createElement('DIV');
            div.classList.add('notify');
            return div;
        }

        render(data) {
            if (data.message == null) {
                return;
            }

            const notifyId = NS.util.generateId();

            var container = document.createElement('DIV');
            container.setAttribute('data-id', notifyId);
            container.classList.add('notify_container');
            container.innerHTML = 
                '<div class="notify_header">' +
                    '<span class="close">&times;</span>' +
                '</div>' +
                '<div class="notify_body">' + data.message + '</div>';

            container.querySelector('.close').addEventListener('click', (e) => {
                this.closePopup(notifyId);
            });

            this.el.appendChild(container);
            
            this.setTimeout(HIDE_TIMEOUT, () => {
                this.closePopup(notifyId);
            });
        }

        closePopup(id) {
            var popup = this.el.querySelector('.notify_container[data-id="' + id + '"]');
            if (popup) {
                popup.remove();
            }
        }

    }

    NS.Notify = Notify;
})(Book);
