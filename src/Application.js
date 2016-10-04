(function(NS) {
    'use strict';
    class Application {
        constructor() {

            /*
             * Services
             */
            this.store = new NS.CSA();
            this.api = new NS.Api({
                key: NS.config.apiKey,
                host: NS.config.apiHost
            });

            /*
             * Views
             */
            this.notify = new NS.Notify();
            document.body.appendChild(this.notify.el);

            this.searchBar = new NS.SearchBar();
            document.getElementById('search')
                .appendChild(this.searchBar.el);
            this.searchBar.render();
            this.searchBar.on('search', (value) => {
                this.searchBar.startLoad();
                this.api.searchBooks(value, this.showSearchResults.bind(this));
            });

            this.searchBookList = new NS.CardsList();
            document.getElementById('search-results')
                .appendChild(this.searchBookList.el);
            this.searchBookList.on('clicked', (dataId) => {
                this.store.saveItem(dataId);
                this.searchBookList.updateCard(dataId, 'saved');
                this.savedBooks.render(this.store.getSaved());
            });

            this.savedBooks = new NS.CardsList();
            document.getElementById('saved-books')
                .appendChild(this.savedBooks.el);
            this.savedBooks.render(this.store.getSaved());
            this.savedBooks.on('clicked', (dataId) => {
                this.store.removeItem(dataId);
                this.savedBooks.render(this.store.getSaved());
            });

        }

        showSearchResults(err, data) {
            this.searchBar.stopLoad();
            if (err) {
                this.notify.render({
                    message: 'Couldn\'t retrieve books data'
                });
                return;
            }

            if (data && data.items && data.items.length) {
                this.store.fillSearched(data.items);
                this.searchBookList.render(this.store.getSearched());
            } else {
                this.notify.render({
                    message: 'Couldn\'t find anything :('
                });
            }

        }
    }
    NS.Application = Application;
})(Book);
