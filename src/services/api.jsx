function fetchImages(name, page) {
	return (
				fetch(
				`https://pixabay.com/api/?q=${name}&page=${page}&key=27661968-fba717fb37b630c6286acce7d&image_type=photo&orientation=horizontal&per_page=12`
			)
				.then(res => {
					if (res.ok) {
						return res.json()
					}

					return Promise.reject(
						new Error(`There is no picteru with the name: '${name}'`)
					)

				})
)
}


export default fetchImages;