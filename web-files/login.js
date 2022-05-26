	function getUrlVars() {
		var vars = {};
		var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
		function (m, key, value) {
			vars[key] = value;
			});
		return vars;
		}
		console.log("POST")
    const req = new XMLHttpRequest()
    req.open("POST", "https://weather-bot.benja.ml/login")
		req.setRequestHeader("Content-Type", "application/json");
		const send = {
			token: getUrlVars()["access_token"],
			type:  getUrlVars()["token_type"]
		}
		req.send(JSON.stringify(send))
		console.log(send)
		
    req.onload = () => {
			const data = JSON.parse(req.response)
    	document.getElementById("display_result").innerText = "Welcome " + data.username +  " Redirecting you to dashboard"
			localStorage.setItem('d_id', data.id);
			localStorage.setItem('d_user', data.username);
			localStorage.setItem('d_tag', data.tag);
			localStorage.setItem('d_avatar', data.avatar);
			window.location.href = "/dash"
	}
	