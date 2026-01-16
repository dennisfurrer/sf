import { redirect } from "next/navigation";

// Root page redirects to the discover page (default locale doesn't need prefix)
export default function RootPage() {
  redirect("/discover");
}
