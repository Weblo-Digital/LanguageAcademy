import { db } from "@/lib/db";
import { verifySession } from "@/lib/auth/dal";
import { EditProgramForm } from "@/components/admin/EditProgramForm";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminEditProgramPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await verifySession();
  const { id } = await params;
  const programId = parseInt(id, 10);

  if (isNaN(programId)) {
    notFound();
  }

  // Fetch program including French and English translation mappings
  const program = await db.program.findUnique({
    where: { id: programId },
    include: {
      translations: true,
    },
  });

  if (!program) {
    notFound();
  }

  return <EditProgramForm program={JSON.parse(JSON.stringify(program))} />;
}
