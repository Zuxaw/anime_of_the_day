import "@/styles/globals.css"

import { Metadata } from "next"
import { Inter } from "next/font/google"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import Providers from "@/components/Providers"
import { TailwindIndicator } from "@/components/tailwind-indicator"

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	description: siteConfig.description,
	themeColor: [
		// { media: "(prefers-color-scheme: light)", color: "white" },
		{ media: "(prefers-color-scheme: dark)", color: "black" },
	],
	icons: {
		icon: "/out/logo.png",
		shortcut: "/out/logo.png",
		apple: "/apple-touch-icon.png",
	},
}

const inter = Inter({ subsets: ["latin"] })

interface RootLayoutProps {
	children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={cn("min-h-screen antialiased", inter.className)}>
				<Providers>
					{children}
					<TailwindIndicator />
				</Providers>
			</body>
		</html>
	)
}
