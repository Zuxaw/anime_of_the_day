// component for daily anime

import Image from "next/image"

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

export default function DailyAnime({ animes, day }: Props) {
	return (
		<div>
			<h1 className="text-bold text-center text-2xl">
				{day.charAt(0).toUpperCase() + day.slice(1)}
			</h1>
			<ScrollArea>
				<div className="flex pb-4">
					{animes
						.filter((anime) => anime.broadcast.day?.toLowerCase() === day)
						.map((anime) => {
							return (
								<div
									className="m-4 flex flex-col items-center justify-center"
									key={anime.mal_id}
								>
									<div className="overflow-hidden rounded-md">
										<Image
											src={anime.images.webp.image_url}
											alt={anime.title}
											width={200}
											height={300}
											className="max-w-none object-cover transition-all hover:scale-105"
										/>
									</div>
									<div className="mt-2 h-16 space-y-1 overflow-hidden text-sm">
										{/* control the size of title */}
										<h3 className="w-full truncate text-left font-medium">
											{anime.title}
										</h3>
										<p className="text-xs text-muted-foreground">
											{anime.broadcast.time ?? "Unknown"}
										</p>
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

