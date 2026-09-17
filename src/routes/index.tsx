import {
	Title,
	Meta,
} from "@solidjs/meta";
import {
	createAsync,
	cache,
} from "@solidjs/router";
import { Suspense } from "solid-js";
import BlockRenderer from "~/components/blocks/BlockRenderer";
import type { BlockDefinition } from "~/components/blocks/registry";
import splashImages from "~/data/splashImages";
import { carouselSlides } from "~/data/carousel";
import { programmes } from "~/data/programmes";
import { gatherings } from "~/data/gatherings";
import { getBuilders } from "~/data/builders";
import { getAllInsights } from "~/data/insights";

const getHomeData = cache(async () => {
	"use server";
	const [builders, insights] =
		await Promise.all([
			getBuilders(),
			getAllInsights(),
		]);
	return {
		builders: builders
			.slice(0, 10)
			.map((b) => ({
				name: b.name,
				link: b.link,
				category: b.category,
			})),
		totalBuilders: builders.length,
		insights: insights
			.slice(0, 3)
			.map((i) => ({
				url: i.url,
				title: i.title,
				featured_image:
					i.featured_image,
			})),
	};
}, "home-data");

export const route = {
	load: () => getHomeData(),
};

export default function Home() {
	const data = createAsync(() =>
		getHomeData(),
	);

	const heroBlock =
		(): BlockDefinition[] => [
			{
				type: "HeroSplash",
				props: {
					images: splashImages,
					interval: 4000,
				},
			},
		];

	const contentBlocks =
		(): BlockDefinition[] => {
			const d = data();
			return [
				{
					type: "TextSection",
					props: {
						html: 'Rebuild is a sprint for European social platforms. Connecting the entrepreneurs, the pioneers, the investors and the digital leaders building the next generation of social platforms.<br /><br />Through gatherings, programmes, and tools <span class="font-bold">we build</span>.',
					},
					wrapperClass:
						"py-3xl md:py-6xl",
				},
				{
					type: "Carousel",
					props: {
						slides: carouselSlides,
					},
					wrapperClass:
						"-mx-(--spacing-md) md:mx-0 pb-3xl md:pb-6xl",
				},
				{
					type: "DirectoryPreview",
					props: {
						platforms:
							d?.builders ?? [],
						totalCount:
							d?.totalBuilders ?? 0,
					},
					wrapperClass:
						"pb-3xl md:pb-6xl",
				},
				{
					type: "ProgrammesPreview",
					props: { programmes },
					wrapperClass:
						"pb-3xl md:pb-6xl",
				},
				{
					type: "InsightsPreview",
					props: {
						insights: d?.insights ?? [],
					},
					wrapperClass:
						"pb-4xl md:pb-7xl",
				},
				{
					type: "TextSection",
					props: {
						html: "Three 48-hour gatherings: Rebuild 1, Rebuild 2, and Rebuild 3. Each designed to connect, build, and act. Copenhagen, Helsinki, and Paris.",
					},
				},
				{
					type: "GatheringsPreview",
					props: { gatherings },
				},
				{
					type: "Engage",
					wrapperClass:
						"pb-3xl md:pb-6xl",
				},
				{
					type: "HalfCircle",
				},
			];
		};

	return (
		<main
			id='main-content'
			tabindex='-1'>
			<Title>Rebuild</Title>
			<Meta
				name='description'
				content='A sprint for European social platforms'
			/>
			<Meta
				property='og:title'
				content='Rebuild'
			/>
			<Meta
				property='og:description'
				content='A sprint for European social platforms'
			/>
			<Suspense>
				{/* HeroSplash is full-viewport — rendered outside the content container */}
				<BlockRenderer
					blocks={heroBlock()}
				/>
				{/* All other blocks sit inside a max-width container matching the Eleventy layout */}
				<div class='lg:max-w-max-width mx-auto px-md'>
					<BlockRenderer
						blocks={contentBlocks()}
					/>
				</div>
			</Suspense>
		</main>
	);
}
