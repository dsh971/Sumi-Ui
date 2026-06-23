import { source } from "@/lib/source";
import { createFromSource } from "fumadocs-core/search/server";

// `output: "export"` has no server to answer search queries at request
// time, so this route is baked into a static JSON file at build time
// instead, and the client fetches+queries it locally (see
// fumadocs-core/search/client/orama-static, wired up in mdx-components/the
// search dialog). `force-static` is what makes a Route Handler compatible
// with static export — without it Next treats the route as dynamic and the
// export build fails.
export const dynamic = "force-static";
export const revalidate = false;

const server = createFromSource(source);

export async function GET() {
  return Response.json(await server.export());
}
