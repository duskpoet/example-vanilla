(function(NS) {
    'use strict';
    class CentralStorageAccess {
        constructor() {
            this._data = {};
            this._searched = [];
	    try {
                this._saved = JSON.parse(localStorage.savedBooks);
            } catch (ex) {
                this._saved = {};
            }
        }

        getSearched() {
            return this._searched.map((id) => this._data[id]);
        }

        fillSearched(items) {
            this.resetSearched();
            items.forEach((item) => {
                if (item && item.volumeInfo) {
                    this._searched.push(item.id);
                    this._data[item.id] = Object.assign({id: item.id }, item.volumeInfo);
                }
            });
        }

        resetSearched() {
            this._searched.forEach((id) => {
                delete this._data[id];
            });
            this._searched = [];
        }

        getSaved() {
            return NS.util.values(this._saved);
        }

        saveItem(id) {
            this._saved[id] = this._data[id];
            this._saved[id].saved = true;
            localStorage.savedBooks = JSON.stringify(this._saved);
        }

        removeItem(id) {
            this._saved[id].saved = false;
            delete this._saved[id];
            localStorage.savedBooks = JSON.stringify(this._saved);
        }

    }
    NS.CSA = CentralStorageAccess;
})(Book);
