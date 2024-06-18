import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../ui/card";
import { Skeleton } from "../ui/skeleton";

function RecipeListSkeleton() {
  return (
    <li>
      <Card className="h-[194px]">
        <CardHeader>
          <Skeleton className="w-[140px] h-[30px]" />
          <Skeleton className="w-[196px] h-[20px]" />
        </CardHeader>
        <CardContent>
          <Skeleton className="w-[240px] h-[24px]" />
        </CardContent>
        <CardFooter>
          <Skeleton className="w-[160px] h-[24px]" />
        </CardFooter>
      </Card>
    </li>
  );
}

export default RecipeListSkeleton;
