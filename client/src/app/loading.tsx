import { Skeleton } from "@/components/ui/skeleton"

export default function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3 justify-center items-center">
      <Skeleton className="h-screen w-screen rounded-xl" />
      {/*<div className="space-y-2">*/}
      {/*  <Skeleton className="h-4 w-[250px]" />*/}
      {/*  <Skeleton className="h-4 w-[200px]" />*/}
      {/*</div>*/}
    </div>
  )
}
