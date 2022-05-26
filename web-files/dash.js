		console.log(localStorage.getItem('d_id'))
		document.getElementById("user").innerHTML = "Welcome " + localStorage.getItem('d_user') + " #" + localStorage.getItem('d_tag')
		
		prepUser()
		prep()
		const locations = []
		const user = []
		
		async function prep() {
			const response = await fetch("/loc?q=")
			const data = await response.json()
			for (let i = 0; i < data.results.length; i++) {
				locations.push(data.results[i])
			}
			console.log("Ready!")
		}
		async function prepUser() {
			// Elements
			const current = document.getElementById("current")
			current.innerHTML = ""
			// Data
			const userId = localStorage.getItem('d_id')
			const response = await fetch("/user?id=" + userId)
			
			if (response.status === 404 || response.status === "404") {
				console.warn("User not setup!")
				console.log("Welcome new user!")
			}
			
			const data = await response.json()
			const locs = data.locations
			for (let i = 0; i < locs.length; i++) {
				const p = document.createElement("p")
				p.textContent = locs[i].name
				p.setAttribute("code",locs[i].code)
				p.setAttribute("class","result-user")
				p.setAttribute("onclick","remove(this)")
				current.appendChild(p)
				user.push(locs[i].code)
			}
			console.log(user)
		}
		async function search() {
			// Elements
			const input = document.getElementById("loc-search").value
			const res_div = document.getElementById("results")
			res_div.innerHTML = ""

			for (let i = 0; i < locations.length; i++) {
				const code = locations[i].code
				
				if (locations[i].name.includes(input) && !user.includes(code) && input.length > 3) {
					const p = document.createElement("p")
					p.setAttribute("onclick","add(this)")
					p.setAttribute("code",locations[i].code)
					p.setAttribute("class","result-search")

					p.textContent = locations[i].name

					res_div.appendChild(p)
				}
			}
		}

		function add(elem) {
			const code = elem.getAttribute("code")
			elem.remove()
			const current = document.getElementById("current")
			current.appendChild(elem)
		}

		function remove(elem) {
			elem.remove()
			search()
			const code = elem.getAttribute("code")
			const index = user.indexOf(code);
			if (index > -1) {
  			user.splice(index, 1); // 2nd parameter means remove one item only
			}
			console.log(user)
		}

		async function update() {
			const current = document.getElementById("current")
			const items = current.children
			console.log(items)
			const yourItems = []
			for (let i = 0; i < items.length; i++) {
				console.log(items[i].getAttribute("code"))
				yourItems.push(items[i].getAttribute("code"))
			}
			console.log(yourItems)
			
			const postData = {
				user: localStorage.getItem('d_id'),
				locations: yourItems
			}
			const response = await fetch("/user", {
    		method: 'POST', 
				headers: {
      		'Content-Type': 'application/json'
   			},
				body: JSON.stringify(postData)
		})

		const data = await response.json()

		console.log(data.status)

		if (data.status === "413 - TOO LONG") {
			alert("Error! 4 Stations MAX!")
		}
		prepUser()
		document.getElementById("status").textContent = "Saved"
	}											 