export default function DiffTab() {
  return (
    <div className="flex h-full flex-col animate-in fade-in duration-300">
      <pre className="h-full overflow-x-auto rounded-xl border border-neutral-border/50 bg-[#0d1117] py-4 font-mono text-[13px] leading-relaxed">
        <div className="px-4 text-neutral-500">
          {"  function getUser(id) {"}
        </div>
        <div className="px-4 text-neutral-500">
          {"    const user = users.find(u => u.id === id);"}
        </div>
        <div className="mt-1 w-full bg-success/10 px-4 text-success">
          {"+   if (!user) {"}
        </div>
        <div className="w-full bg-success/10 px-4 text-success">
          {"+     throw new AppError('User not found', 404);"}
        </div>
        <div className="mb-1 w-full bg-success/10 px-4 text-success">
          {"+   }"}
        </div>
        <div className="px-4 text-neutral-500">{"    return user.name;"}</div>
        <div className="px-4 text-neutral-500">{"  }"}</div>
      </pre>
    </div>
  );
}
