import { Arena } from "@/components/arena";
import { generateHint } from "@/app/actions";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export default async function Home() {

  return (
    <main className="h-screen w-screen grid place-items-center bg-red-50">
     <Arena/>
    </main>
  );
}

//Client
//Server - Fetch
