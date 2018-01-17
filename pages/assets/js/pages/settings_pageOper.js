var settings = require('./assets/js/helpers/helper-settings.js')

$('#removeCharacters').select2 ? $('#removeCharacters').select2({
    tags: true,
    tokenSeparators: [',']
}) : null

$('#removeWords').select2 ? $('#removeWords').select2({
    tags: true,
    tokenSeparators: [',']
}) : null


settings.initialize()