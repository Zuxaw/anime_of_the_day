// TODO: Remove this entire file and start your own project from scratch.
// Happy coding!

import { DateTime } from "luxon"

import { getSeasonalAnimes } from "@/services/getSeasonalAnimes"
import DailyAnime from "@/components/DailyAnime"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default async function Page() {
	const animes = await getSeasonalAnimes()
	const days = [
		"sundays",
		"mondays",
		"tuesdays",
		"wednesdays",
		"thursdays",
		"fridays",
		"saturdays",
	]
	const currentDay = days[DateTime.local().weekday]
	return (
		<main className="flex flex-col items-center justify-center ">
			<h1 className="mt-5 text-2xl font-bold">ANIME OF THE DAY 👺</h1>
			<Tabs
				defaultValue={currentDay}
				className=" mt-5 flex flex-col items-center"
			>
				<TabsList slot="mondays">
					<TabsTrigger value="mondays">Mondays</TabsTrigger>
					<TabsTrigger value="tuesdays">Tuesdays</TabsTrigger>
					<TabsTrigger value="wednesdays">Wednesdays</TabsTrigger>
					<TabsTrigger value="thursdays">Thursdays</TabsTrigger>
					<TabsTrigger value="fridays">Fridays</TabsTrigger>
					<TabsTrigger value="saturdays">Saturdays</TabsTrigger>
					<TabsTrigger value="sundays">Sundays</TabsTrigger>
				</TabsList>
				<TabsContent value="mondays">
					<DailyAnime animes={animes} day="mondays" />
				</TabsContent>
				<TabsContent value="tuesdays">
					<DailyAnime animes={animes} day="tuesdays" />
				</TabsContent>
				<TabsContent value="wednesdays">
					<DailyAnime animes={animes} day="wednesdays" />
				</TabsContent>
				<TabsContent value="thursdays">
					<DailyAnime animes={animes} day="thursdays" />
				</TabsContent>
				<TabsContent value="fridays">
					<DailyAnime animes={animes} day="fridays" />
				</TabsContent>
				<TabsContent value="saturdays">
					<DailyAnime animes={animes} day="saturdays" />
				</TabsContent>
				<TabsContent value="sundays">
					<DailyAnime animes={animes} day="sundays" />
				</TabsContent>
			</Tabs>
			<div className="absolute bottom-5 flex w-full justify-evenly">
				<p className="text-center text-sm text-gray-500">
					Made with ❤️ by {/* on click open new page */}
					<a
						className="font-bold text-card-foreground"
						href="https://twitter.com/Zuxaw"
						target="_blank"
						rel="noreferrer"
					>
						@zuxaw
					</a>
				</p>
				<p className="text-center text-sm text-gray-500">
					🚀 powered by{" "}
					<a
						href="https://myanimelist.net/anime/season"
						className="font-bold text-blue-500"
						target="_blank"
						rel="noreferrer"
					>
						myanimelist
					</a>
				</p>
			</div>
		</main>
	)
}
