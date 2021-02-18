import { useState, useEffect } from 'react'
import axios from 'axios'

const url = 'https://pokeapi.co/api/v2/pokemon?limit=151'
const headers = {
	'Cache-Control': 'no-cache',
}

const ClientSide = () => {
	const [pokemon, setPokemon] = useState([])

	useEffect(() => {
		const fetchPokemon = async () => {
			const response = await axios.get(url, { headers })

			/**
			 * map vs forEach
			 */
			// const promises = []
			// response.data.results.forEach((result) => {
			// 	promises.push(axios.get(result.url))
			// })
			const promises = response.data.results.map((result) => {
				return axios.get(result.url, { headers })
			})
			const responses = await Promise.all(promises)

			const pokeData = responses.map((r) => {
				return {
					name: r.data.name,
					imgUrl: r.data.sprites.front_default,
				}
			})
			setPokemon(pokeData)
		}
		fetchPokemon()
	}, [])
	return pokemon.map((poke) => {
		return (
			<div key={poke.name}>
				<img src={poke.imgUrl} alt={poke.name} />
				<p>{poke.name}</p>
				<hr />
			</div>
		)
	})

	return <p>client side</p>
}
export default ClientSide