import { PaymentPage } from "../components/PaymentPage";
import { notFound } from "next/navigation";
import { fetchuser } from "@/actions/useraction";

export default async function Username({ params }) {
  const { username } = await params;
  const decodedUsername = decodeURIComponent(username);

  // Check if user exists in database
  const user = await fetchuser(decodedUsername);

  if (!user) {
    notFound();
  }

  return (
    <PaymentPage username={username} />
  );
}