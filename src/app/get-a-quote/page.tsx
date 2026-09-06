import { redirect } from "next/navigation";

export default function GetAQuotePage() {
  // Never render a separate page for Get a Quote; redirect to root and trigger dialog modal
  redirect("/?quote=true");
}
