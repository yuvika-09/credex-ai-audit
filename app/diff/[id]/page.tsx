import AuditDiff from "@/components/AuditDiff";

export default async function DiffPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {

    const { id } = await params;

    return (
        <AuditDiff id={id} />
    );
}