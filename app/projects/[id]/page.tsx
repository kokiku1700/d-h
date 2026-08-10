

export default async function Project ( params: Promise<{ id: string }>) {
    const { id } = await params;

    return (
        <div>
            {id}
        </div>
    )
}