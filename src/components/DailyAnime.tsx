// component for daily anime
// "use client"

import Image from "next/image"
import { DateTime } from "luxon"

import { Anime } from "@/types/anime"

import { ScrollArea, ScrollBar } from "./ui/scroll-area"

interface Props {
	animes: Anime[]
	day:
		| "mondays"
		| "tuesdays"
		| "wednesdays"
		| "thursdays"
		| "fridays"
		| "saturdays"
		| "sundays"
}

const convertDayToYourLocalTimeZone = (
	day: string,
	hour: string | undefined,
	startTimeZone: string
): string => {
	// Create a DateTime object with the current date and start time zone
	const now = DateTime.now().setZone(startTimeZone)

	// Get the user's local time zone
	const localTimeZone = DateTime.local().zoneName ?? "UTC"
	const days = [
		"sundays",
		"mondays",
		"tuesdays",
		"wednesdays",
		"thursdays",
		"fridays",
		"saturdays",
	]

	// Create a DateTime object with the provided day, hour, and start time zone
	const targetDateTime = now
		.set({
			weekday: days.indexOf(day),
			hour: parseInt(hour?.split(":")[0] ?? "0"),
			minute: 0,
			second: 0,
			millisecond: 0,
		})
		.setZone(startTimeZone)

	// Convert the DateTime object to the user's local time zone
	const convertedDateTime = targetDateTime.setZone(localTimeZone)

	// Format the converted DateTime to a desired string format
	const formattedDateTime = convertedDateTime.toFormat("cccc")

	return (formattedDateTime + "s").toLowerCase()
}

const convertTimeToYourLocalTimeZone = (
	time: string,
	startTimeZone: string
): string => {
	// Create a DateTime object with the current date and start time zone
	if (!time) return "unknown"
	const now = DateTime.now().setZone(startTimeZone)

	// Get the user's local time zone
	const localTimeZone = DateTime.local().zoneName ?? "UTC"

	// Create a DateTime object with the provided day and start time zone
	const targetDateTime = now
		.set({
			hour: parseInt(time.split(":")[0]),
			minute: parseInt(time.split(":")[1]),
		})
		.setZone(startTimeZone)

	// Convert the DateTime object to the user's local time zone
	const convertedDateTime = targetDateTime.setZone(localTimeZone)

	// Format the converted DateTime to a desired string format
	const formattedDateTime = convertedDateTime.toFormat("t")

	return formattedDateTime
}

const convertDateToYourLocalTimeZone = (
	date: string,
	startTimeZone: string
): string => {
	// Create a DateTime object with the current date and start time zone
	if (!date) return "unknown"
	const now = DateTime.now().setZone(startTimeZone)

	// Get the user's local time zone
	const localTimeZone = DateTime.local().zoneName ?? "UTC"
	// Create a DateTime object with the provided day and start time zone
	const targetDateTime = now.set({
		year: parseInt(date.split("/")[2]),
		month: parseInt(date.split("/")[0]),
		day: parseInt(date.split("/")[1]),
	})

	// Convert the DateTime object to the user's local time zone
	const convertedDateTime = targetDateTime.setZone(localTimeZone)

	// Format the converted DateTime to a desired string format
	const formattedDateTime = convertedDateTime.toFormat("D")

	return formattedDateTime
}

export default function DailyAnime({ animes, day }: Props) {
	const currentDate = new Date()
	return (
		<div className="m-5">
			<ScrollArea>
				<div className="flex max-w-6xl">
					{animes
						.filter(
							(anime) =>
								convertDayToYourLocalTimeZone(
									anime.broadcast.day?.toLowerCase(),
									anime.broadcast.time,
									anime.broadcast.timezone
								) === day
						)
						.map((anime) => {
							const airedFrom = convertDateToYourLocalTimeZone(
								new Date(anime.aired.from).toLocaleDateString(),
								anime.broadcast.timezone
							)
							const broadcastTime = convertTimeToYourLocalTimeZone(
								anime.broadcast.time,
								anime.broadcast.timezone
							)

							return (
								<div
									className="m-4 flex flex-col items-center justify-center space-y-3"
									key={anime.mal_id}
								>
									<div className="relative cursor-pointer overflow-hidden rounded-md">
										{new Date(airedFrom) > currentDate && (
											<div className="absolute z-10 flex h-[300px] w-[200px] flex-col items-center justify-center rounded-md bg-gray-800 opacity-60">
												<p className="text-center text-white">From</p>
												<p className="text-center font-bold text-white">
													{airedFrom}
												</p>
											</div>
										)}
										<Image
											src={anime.images.webp.large_image_url}
											alt={anime.title}
											width={200}
											height={300}
											className="aspect-[3/4] h-[300px] w-[200px] max-w-none object-cover transition-all  hover:scale-105"
										/>
									</div>
									<div className="mt-2 h-16 w-[200px] space-y-1 overflow-hidden text-sm">
										<h3 className="w-full truncate text-left font-medium">
											{anime.title}
										</h3>
										<div className="flex justify-between">
											<p className="text-xs text-muted-foreground">
												{broadcastTime}
											</p>
											<p className="text-xs text-muted-foreground">
												{anime.score ? anime.score + "/10" : "N/A"}
											</p>
										</div>
									</div>
								</div>
							)
						})}
				</div>
				<ScrollBar orientation="horizontal" />
			</ScrollArea>
		</div>
	)
}

