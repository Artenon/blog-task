import { FC } from "react";
import { Skeleton, Card, CardContent } from "@mui/material";

export const BlogCardSkeleton: FC = () => (
  <Card sx={{ height: "320px" }}>
    <Skeleton variant="rectangular" height={150} />
    <CardContent sx={{ pb: 0 }}>
      <Skeleton variant="rectangular" height="20px" sx={{ marginBottom: "20px" }} />

      <Skeleton variant="rectangular" height="70px" />
    </CardContent>
  </Card>
);
