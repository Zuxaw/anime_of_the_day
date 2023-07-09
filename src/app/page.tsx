// TODO: Remove this entire file and start your own project from scratch.
// Happy coding!

import { useGetSeasonalAnimes } from "@/hooks/useGetSeasonalAnimes"
import DailyAnime from "@/components/DailyAnime"

export default async function Page() {
	const animes = await useGetSeasonalAnimes()
	return (
		<main className="">
			<DailyAnime animes={animes} day="mondays" />
			<DailyAnime animes={animes} day="tuesdays" />
			<DailyAnime animes={animes} day="wednesdays" />
			<DailyAnime animes={animes} day="thursdays" />
			<DailyAnime animes={animes} day="fridays" />
			<DailyAnime animes={animes} day="saturdays" />
			<DailyAnime animes={animes} day="sundays" />
		</main>
	)
}
