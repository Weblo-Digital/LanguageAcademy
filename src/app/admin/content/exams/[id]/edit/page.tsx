import { db } from "@/lib/db";
import { verifySession } from "@/lib/auth/dal";
import { EditExamForm } from "@/components/admin/EditExamForm";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminEditExamPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await verifySession();
  const { id } = await params;
  const examId = parseInt(id, 10);

  if (isNaN(examId)) {
    notFound();
  }

  // Fetch exam including French and English translations
  const exam = await db.exam.findUnique({
    where: { id: examId },
    include: {
      translations: true,
    },
  });

  if (!exam) {
    notFound();
  }

  return <EditExamForm exam={JSON.parse(JSON.stringify(exam))} />;
}
