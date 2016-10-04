(function(NS) {
    'use strict';

    const ANIMATION_INTERVAL = 300;
    class SearchBar extends NS.BaseView {
        createEl() {
            var div = document.createElement('DIV');
            div.classList.add('mui-row');
            return div;
        }

        render() {
            this.el.innerHTML =
                document.getElementById('search_template').innerHTML;
            this.setHandlers();
        }

        setHandlers() {
            var input = document.getElementById('search_input');
            document.getElementById('search_button')
                .addEventListener('click', (e) => {
                    var value = input.value.trim();
                    if (value) {
                        this.trigger('search', value);
                    }
                });

            input
                .addEventListener('keypress', (e) => {
                    if (e.which === 13) {
                        e.preventDefault();
                        var value = input.value.trim();
                        this.trigger('search', value);
                    }
                });
        }

        startLoad() {
            var btn = document.getElementById('search_button');
            btn.textContent = 'Loading';
            btn.disabled = true;
            this._animationId = setInterval(() => {
                var text = btn.textContent;
                var match = text.match(/\./g);
                var num = ((match ? match.length : 0) + 1) % 4;
                btn.textContent = 'Loading' + (new Array(num + 1)).join('.');
            }, ANIMATION_INTERVAL);
        }

        stopLoad() {
            var btn = document.getElementById('search_button');
            btn.textContent = 'Search';
            btn.disabled = false;
            clearInterval(this._animationId);
        }
    }

    NS.SearchBar = SearchBar;
})(Book);
