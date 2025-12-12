import { default as matter } from "gray-matter";
import { marked } from "marked";

const POSTS_DIR = `${import.meta.dir}/../../blog/posts`;

export interface Post {
	slug: string;
	title: string;
	date: Date;
	content: string;
	html: string;
	wordCount: number;
	numberOfMinutes: number;
	description: string;
	tags: string[];
}

export async function getAllPosts(): Promise<Post[]> {
	const posts: Post[] = [];

	// Bun.Glob finds all markdown files in the posts folder
	const glob = new Bun.Glob("*.md");

	for await (const file of glob.scan(POSTS_DIR)) {
		const slug = file.replace(/\.md$/, "");
		const raw = await Bun.file(`${POSTS_DIR}/${file}`).text();
		const { data, content } = matter(raw);
		const formattedDate = data.date.toLocaleDateString("en-GB", {
			year: "numeric",
			month: "short",
			day: "numeric",
		});
		posts.push({
			slug,
			title: data.title ?? slug,
			date: formattedDate ?? "",
			content,
			html: await marked.parse(content),
			wordCount: 0,
			numberOfMinutes: data.minutes ?? 0,
			description: data.description ?? "",
			tags: Array.isArray(data.tags) ? data.tags : [],
		});
	}

	// Sort newest first
	posts.sort((a, b) => (a.date < b.date ? 1 : -1));

	return posts;
}

export async function getPost(slug: string): Promise<Post | null> {
	try {
		const raw = await Bun.file(`${POSTS_DIR}/${slug}.md`).text();
		const { data, content } = matter(raw);

		const plainText = content
			.replace(/[#_*`>\-[\]()!]/g, "") // remove markdown symbols
			.replace(/\s+/g, " ") // normalize whitespace
			.trim();

		const wordCount = plainText ? plainText.split(" ").length : 0;
		return {
			slug,
			title: data.title ?? slug,
			date: data.date ?? "",
			content,
			html: await marked.parse(content),
			wordCount,
			numberOfMinutes: data.minutes ?? 0,
			description: data.description ?? "",
			tags: Array.isArray(data.tags) ? data.tags : [],
		};
	} catch {
		return null;
	}
}
