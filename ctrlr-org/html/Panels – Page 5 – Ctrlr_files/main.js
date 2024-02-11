function google_recaptcha() {
	var recaptcha = document.getElementsByClassName("google_recaptcha-recaptcha");
	for (var i = 0; i < recaptcha.length; i++) {
		grecaptcha.render(recaptcha.item(i), {"sitekey" : google_recaptcha_recaptcha.site_key});
	}
};