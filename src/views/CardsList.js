(function(NS) {
    'use strict';
    class CardsList extends NS.BaseView {
        constructor(el) {
            super(el);
            this.children = [];
        }

        createEl() {
            var div = document.createElement('div');
            div.classList.add('cards-list');
            return div;
        }

        render(data) {
            this.removeChildren();
            data.forEach((item) => {
                var view = new NS.Card();
                this.children.push(view);
                view.id = item.id;
                this.el.appendChild(view.el);
                view.render(item);
                view.on('clicked', (dataId) => {
                    this.trigger('clicked', dataId);
                });
            });
        }

        updateCard(id, status) {
            var process = (work) => {
                this.children.forEach((view) => {
                    if (view.id === id) {
                        work(view);
                    }
                });
            };

            switch (status) {
                case 'saved':
                    process((view) => {
                        view.stateAdded();
                    });
                    break;
                default:
                    throw new Error('Unknown card status');

            }
        }

        removeChildren() {
            this.children.forEach((child) => {
                child.remove();
            });
            this.children.length = 0;
        }

        remove() {
            this.removeChildren();
            super.remove();
        }
    }

    NS.CardsList = CardsList;
})(Book);
