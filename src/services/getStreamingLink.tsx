import { Anime } from "@/types/anime"

export async function getStreamingLink(id: Anime["mal_id"]): Promise<string> {
	const res = await fetch("https://api.jikan.moe/v4/anime/" + id + "/streaming")
	const output = await res.json()
	return output.data
}

