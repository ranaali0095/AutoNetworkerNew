$(document).ready(function() {

    /* ---------- Datapicker ---------- */
    $('.date-picker').datepicker();

    /* ---------- Choosen ---------- */
    $('#select2-1, #select2-2, #select2-3, #select2-4').select2();

    /* ---------- Placeholder Fix for IE ---------- */
    $('input, textarea').placeholder();

    /* ---------- Auto Height texarea ---------- */
    $('textarea').autosize();

    /* ---------- Masked Input ---------- */
    $("#date").mask("99/99/9999");
    $("#phone").mask("(999) 999-9999");
    $("#tin").mask("99-9999999");
    $("#ssn").mask("999-99-9999");
    $('#ccnumber').mask("9999 9999 9999 9999");

    $.mask.definitions['~'] = '[+-]';
    $("#eyescript").mask("~9.99 ~9.99 999");

    /* ---------- Textarea with limits ---------- */
    $('#limit').inputlimiter({
        limit: 10,
        limitBy: 'words',
        remText: 'You only have %n word%s remaining...',
        limitText: 'Field limited to %n word%s.'
    });

    /* ---------- Timepicker for Bootstrap ---------- */
    $('#timepicker1').timepicker();

    /* ---------- DateRangepicker for Bootstrap ---------- */
    $('#daterange').daterangepicker();

    /* ---------- Bootstrap Wysiwig ---------- */
    $('.editor').wysiwyg();

    /* ---------- Colorpicker for Bootstrap ---------- */
    $('#colorpicker1').colorpicker();

});