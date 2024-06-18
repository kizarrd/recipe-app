import { Skeleton } from "../ui/skeleton";

function RecipeSkeleton() {
  return (
    <main className="text-foreground">
      <header className="text-center max-w-[70ch] mx-auto bold mt-10 mb-24">
        <Skeleton className="h-[48px] lg:h-[60px] xl:h-[72px] uppercase mb-2" />
        <Skeleton className="h-[16px] lg:h-[20px] max-w-[45ch] mx-auto mb-4" />
        <div className="flex justify-center gap-2 max-w-72 flex-wrap mx-auto mb-4">
          {/*  Badge? */}
        </div>
        <Skeleton className="h-[12px] text-muted-foreground max-w-[160px] mx-auto mb-1" />
        <Skeleton className="h-[12px] text-muted-foreground max-w-[160px] mx-auto" />
      </header>
      <section className="max-w-[94ch] mx-auto">
        <div className="container grid md:grid-cols-2 gap-8 mb-24">
          <Skeleton className="h-[48px] col-span-2 max-w-[360px]" />
          <Skeleton className="h-[32px] col-span-2 max-w-[160px]" />
          <Skeleton className="max-md:col-span-2 h-[220px]" />
          <Skeleton className="max-md:col-span-2 h-[220px]" />
        </div>
        <div className="container flex flex-col gap-8 pb-8">
          <Skeleton className="h-[48px] col-span-2 max-w-[360px]" />
          <Skeleton className="h-[420px]" />
        </div>
      </section>
    </main>
  );
}

export default RecipeSkeleton;
