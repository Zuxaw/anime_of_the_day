import { Anime } from "@/types/anime"

export async function getSeasonalAnimes(): Promise<Anime[]> {
	const res = await fetch("https://api.jikan.moe/v4/seasons/now")
	const output = await res.json()
	return output.data
}

