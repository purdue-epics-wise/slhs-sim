$(document).ready(function() {

    var data = {};

    var schema = {
        "type": "object",
        "properties": {
            "choice1": {
                "enum": [0, 1, 2, 3]
            },
            "error1": {
                "type": "boolean",
            },
        }
    };

    var options = {
        "fields": {
            "choice1": {
                "type": "radio",
                "label": "1.",
                "removeDefaultNone": true,
                "optionLabels": ["1", "2", "3", "4"]
            },
            "error1": {
                "type": "checkbox",
                "rightLabel": "E"
            },
        }
    };

    $("#ppvt4-form").alpaca({
        "data": data,
        "schema": schema,
        "options": options,
        "ui": "bootstrap"
    });
});

