export const fetchHandler = async (url, options = {}) => {
	// create a new async function with parameters of url and options.
	try {
		// try
		const response = await fetch(url, options); // create a variable of response to store the data from the fetch method request
		if (!response.ok) {
			// if the response.ok is not true, then
			throw new Error( // throw a new Error object.
				`Fetch failed withs tatus - ${response.status}, ${response.statusText}` // error.message
			);
		}

		const isJson = (response.headers.get("content-type") || "").includes(
			"application/json"
		); // get the headers from the response.headers. It is also making sure that the the content-type property of the response contains JSON.
		if (isJson) {
			// if the isJSON is true,
			const jsonData = await response.json(); // create a new variable called json data and store it as response.json() - await because async
			return [jsonData, null]; // why return tuple?
		}

		const textData = await response.text(); // create a new variable called textData and store it as response.text() - await because async
		return [textData, null]; // why return tuple?
	} catch (error) {
		// catch with the parameter of the error object.
		console.warn(error); // console.log the error but with warn? guessing bright red?
		return [null, error]; // why tuple?
	}
};
