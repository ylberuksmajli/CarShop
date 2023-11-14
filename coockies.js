if (!localStorage.getItem('cookie-consent')) {
    var cookieConsentBanner = document.getElementById('cookie-consent-banner');
    cookieConsentBanner.style.display = 'block';
}
function acceptCookies() {
    localStorage.setItem('cookie-consent', 'true');  
    var cookieConsentBanner = document.getElementById('cookie-consent-banner');
    cookieConsentBanner.style.display = 'none';
}