import CollectionCard, { Collection } from "./CollectionCard";

interface CollectionsGridProps {
  collections: Collection[];
}

export default function CollectionsGrid({ collections }: CollectionsGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {collections.map((collection) => (
        <CollectionCard key={collection.id} collection={collection} />
      ))}
    </div>
  );
}
