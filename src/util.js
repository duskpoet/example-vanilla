(function(NS) {
    'use strict';

    var count = 0;

    NS.util = {
        generateId: function() {
            return ++count;
        },

        values: function(obj) {
            var result = [];
            for (var key in obj) {
                result.push(obj[key]);
            }
            return result;
        }
    };
})(Book);
