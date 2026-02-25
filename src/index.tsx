import { Hono } from "hono";
import { tailwind } from "hono-tailwind";
import { serveStatic } from "hono/bun";
import { getAllPosts, getPost } from "./lib/posts";

const app = new Hono();

app.use("/public/*", serveStatic({ root: "./" }));

// --- Global renderer ---
app.use("/tailwind.css", tailwind());

app.use("*", async (c, next) => {
  c.setRenderer((content) => {
    return c.html(
      "<!DOCTYPE html>" +
      (
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="ie=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            <meta name="author" content="Jimmy Verburgt" />
            <link rel="canonical" href="https://jimmyverburgt.com/"></link>
            <meta name="description" content="Hi, i'm Jimmy" />
            <meta
              name="keywords"
              content="jimmy, verburgt, jimmy verburgt, software, development"
            />
            <link rel="icon" type="image/png" sizes="32x32" href="/public/favicon.png"></link>

            <link rel="stylesheet" href="/public/app.css" />
            <link rel="stylesheet" href="/tailwind.css" />
            <link rel="preload" href="/tailwind.css" as="style" />
            <style>
              {`
              .back-button {
                opacity: 0;
                transform: translateX(-10px);
                transition: opacity 0.3s ease, transform 0.3s ease;
              }
              .back-button.show {
                opacity: 1;
                transform: translateX(0);
              }
            `}
            </style>
            <script>let FF_FOUC_FIX;</script>
          </head>
          <body class="w-full flex flex-col min-h-screen font-mono text-[#222]">
            <div class="flex flex-1 flex-col justify-center">
              <header class="w-full">
                <nav class="w-full px-[5%] md:px-[15%] lg:px-[20%] py-5 flex flex-row justify-between">
                  <a
                    href="/"
                    class="font-bold text-md hover:underline hover:cursor-pointer font-pixel"
                  >
                    Jimmy Verburgt
                  </a>
                  <div class="flex gap-5">
                    <a href="/blog" class="opacity-60 hover:underline hover:cursor-pointer">
                      Blog
                    </a>
                    <a
                      href="mailto:jimmyverburgt@gmail.com"
                      class="opacity-60 hover:underline hover:cursor-pointer hidden sm:inline-block"
                    >
                      jimmyverburgt@gmail.com
                    </a>
                  </div>
                </nav>
              </header>

              {content}
            </div>
          </body>
        </html>
      ),
    );
  });
  await next();
});

// --- Post List Page ---
app.get("/", async (c) => {
  return c.render(
    <>
      <title>Jimmy Verburgt</title>
      <meta
        name="description"
        content="hi there, i'm Jimmy. Welcome to my personal website and blog"
      />

      <main class="w-full px-[5%] md:px-[15%] lg:px-[20%] mb-10 flex flex-col justify-center items-center flex-[1_auto]">
        <h1 class="bg-red-600 mb-5 text-white rounded-xs inline-block mx-auto p-1 text-3xl font-bold font-pixel">
          hi there, i'm Jimmy
        </h1>
        <p class="mb-5">I do software and stuff</p>
        <div class="flex flex-row gap-6 items-center justify-center">
          <a
            href="mailto:jimmyverburgt@gmail.com"
            target="_blank"
            aria-label="Email me"
            rel="noopener"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-mail"
            >
              <title>Email me</title>
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </a>
          <a
            href="https://github.com/VerburgtJimmy"
            target="_blank"
            aria-label="My github"
            rel="noopener"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-github"
            >
              <title>My github</title>
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/jimmy-verburgt-4774401a7/"
            target="_blank"
            aria-label="My linkedin"
            rel="noopener"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-linkedin"
            >
              <title>My linkedin</title>
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a>
        </div>
      </main>
    </>,
  );
});

app.get("/blog", async (c) => {
  const posts = await getAllPosts();
  return c.render(
    <>
      <title>Blog - Jimmy Verburgt</title>
      <meta name="description" content="Welcome to the software development blog of Jimmy" />
      <main class="w-full px-[5%] md:px-[15%] lg:px-[20%] mb-10 flex flex-col justify-center flex-[1_auto]">
        <h1 class="text-5xl font-bold mb-10 font-pixel">Blog</h1>
        {posts.map((p) => (
          <a
            href={`/blog/${p.slug}`}
            class="border-dashed border-b py-5 flex flex-row justify-between items-center"
          >
            <div class="flex flex-col gap-5">
              <h2 class="text-2xl">{p.title}</h2>
              <p class="opacity-60">{p.description}</p>
            </div>
            <p class="font-pixel">{p.date}</p>
          </a>
        ))}
      </main>
    </>,
  );
});

// --- Single Post Page ---
app.get("/blog/:slug", async (c) => {
  const slug = c.req.param("slug");
  const post = await getPost(slug);
  if (!post) return c.text("Not found", 404);
  const formattedDate = post.date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return c.render(
    <>
      <title>{post.title} | Jimmy Verburgt blog</title>
      <meta name="description" content={`${post.description}`} />
      <meta name="keywords" content={post.tags.join(", ")} />
      <main class="w-full px-[5%] md:px-[15%] lg:px-[20%]  mb-10 flex flex-col flex-[1_auto]">
        <a
          href="/blog"
          class="text-sm bg-[#dcdcdc]/60 inline-flex w-fit flex-row justify-center items-center rounded-4xl p-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-arrow-left-circle inline-block h-4 w-4 align-[-.125rem] mr-2"
          >
            <title>Back</title>
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 8 8 12 12 16"></polyline>
            <line x1="16" y1="12" x2="8" y2="12"></line>
          </svg>
          Back
        </a>

        <div class="opacity-60 text-xs mt-8 leading-[normal]">
          <p class="my-2 font-pixel">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-clock inline-block h-3 w-3 align-[-.125rem] mr-2"
            >
              <title>Reading time</title>
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            {post.numberOfMinutes === 1 ? "one minute" : `${post.numberOfMinutes}·minutes`}
          </p>
        </div>
        <article>
          <h2 class="text-5xl mb-5! mt-0! font-bold font-pixel">{post.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </article>
        <hr class="opacity-20 border-none h-px w-full bg-[#222]" />
        <div class="opacity-60 mb-2 text-xs mt-8">
          <p class="my-2 font-pixel">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-file-text inline-block h-3 w-3 align-[-.125rem] mr-2"
            >
              <title>Word count</title>
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            {post.wordCount} words
          </p>
          <p class="my-2 font-pixel">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-calendar inline-block h-3 w-3 align-[-.125rem] mr-2"
            >
              <title>Published date</title>
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            {formattedDate}
          </p>
        </div>
      </main>
    </>,
  );
});

Bun.serve({
  fetch: app.fetch,
  port: 3210,
  hostname: "0.0.0.0",
});

export default app;
