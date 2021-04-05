(function($) {
    if (browser.touch === false) { import('./contextCursor.js') }

    document.querySelectorAll('button').forEach((item) => {
        item.setAttribute('data-ccursor', '')
    })

    document.querySelectorAll('.button').forEach((item) => {
        item.setAttribute('data-ccursor', '')
    })

    document.querySelectorAll('.btn').forEach((item) => {
        item.setAttribute('data-ccursor', '')
    })

    document.querySelectorAll('.social-icon').forEach((item) => {
        item.setAttribute('data-ccursor', '')
    })
})(jQuery);