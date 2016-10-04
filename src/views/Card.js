(function(NS) {
    'use strict';
    class Card extends NS.BaseView {

        get buttonClassesAdd() {
            return 'mui-btn mui-btn--fab card_button add-button ';
        }

        get buttonClassesAdded() {
            return 'mui-btn mui-btn--fab card_button added-button';
        }

        get buttonClassesRemove() {
            return 'mui-btn mui-btn--fab card_button remove-button';
        }

        createEl() {
            var div = document.createElement('DIV');
            div.classList.add('card', 'mui--z1');
            return div;
        }

        render(data) {
            this._dataId = data.id;
            var thumb = data.imageLinks && data.imageLinks.smallThumbnail || '/no_book_cover.jpg';
            var authors = data.authors && data.authors.join(', ');
            var buttonClass = 'add-button';
            this.el.innerHTML =
                '<a href="' + data.previewLink + '">' +
                    '<h4 class="card_title" title="' + data.title + '"/>' + data.title + '</h4>' +
                    '<img class="card_cover" src="' + thumb + '" alt="Book cover"/>' +
                    (data.authors ? ('<h5 class="card_author" title="' + authors + '">' + authors + '</h5>') : '') +
                '</a>' +
                '<div class="card_buttons">' +
                    '<button class="' + this.buttonClassesAdd + '"></button>' +
                    '<button class="' + this.buttonClassesAdded + '"></button>' +
                    '<button class="' + this.buttonClassesRemove + '"></button>' +
                '</div>';
            this.buttonAddEl = this.el.querySelector('button.add-button');
            this.buttonAddedEl = this.el.querySelector('button.added-button');
            this.buttonRemoveEl = this.el.querySelector('button.remove-button');
            this._saved = data.saved;
            this.buttonAddEl.addEventListener('click', (e) => {
                this.trigger('clicked', this._dataId);
            });
            this.buttonRemoveEl.addEventListener('click', (e) => {
                this.trigger('clicked', this._dataId);
            });
            this.defaultState();

        }

        defaultState() {
            if (this._saved) {
                this.stateRemove();
            } else {
                this.stateAdd();
            }
        }

        stateAdd() {
            this.el.classList.remove('added');
        }

        stateAdded() {
            this.el.classList.add('added');
        }

        stateRemove() {
            this.el.classList.add('remove');
        }
    }

    NS.Card = Card;
})(Book);
