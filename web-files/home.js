try {
if (localStorage.getItem('d_id') !== null || localStorage.getItem('d_id') === undefined) {
	const client_st = document.getElementById("client-status")

	client_st.textContent = "Logged in as " + localStorage.getItem('d_user')

	window.location.href = "/dash"	
}
} catch (err) {
	const client_st = document.getElementById("client-status")

	client_st.textContent = "Error Logging you in. Please try again!"
}