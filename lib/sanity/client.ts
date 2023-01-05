// @ts-nocheck
import { apiVersion, dataset, projectId, useCdn } from "./config";
import type { Post, Settings } from "./groq";
import { pagePaths, settingsQuery, singlePage } from "./groq";
import { createClient } from "next-sanity";

if (!projectId) {
  console.error(
    "The Sanity Project ID is not set. Check your environment variables."
  );
}

/**
 * Checks if it's safe to create a client instance, as `@sanity/client` will throw an error if `projectId` is false
 */
const client = projectId
  ? createClient({ projectId, dataset, apiVersion, useCdn })
  : null;

export async function getSettings(): Promise<Settings> {
  return await client.fetch(settingsQuery);
}

export async function getAllPagesWithSlug(): Promise<string[]> {
  return await client.fetch(pagePaths);
}

export async function getPageBySlug(
  slug: string
): Promise<{ page: Post; settings: any }> {
  if (client) {
    return (await client.fetch(singlePage, { slug })) || ({} as any);
  }
  return {} as any;
}

// export async function getPostAndMoreStories(
//     slug: string,
//     token?: string | null
// ): Promise<{ post: Post; morePosts: Post[] }> {
//     if (projectId) {
//         const client = createClient({
//             projectId,
//             dataset,
//             apiVersion,
//             useCdn,
//             token: token || undefined,
//         })
//         return await client.fetch(postAndMoreStoriesQuery, { slug })
//     }
//     return { post: null, morePosts: [] }
// }
