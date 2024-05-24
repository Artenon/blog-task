import { FC } from "react";
import { Skeleton, Card, CardContent, Box } from "@mui/material";

export const BlogCardSkeleton: FC = () => (
  <Card sx={{ height: "320px", display: "flex", flexDirection: "column" }}>
    <Skeleton variant="rectangular" height={150} />
    <CardContent sx={{ flexGrow: 1, paddingBottom: "15px !important" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <Box>
          <Skeleton variant="rectangular" height="20px" sx={{ marginBottom: "20px" }} />

          <Skeleton variant="rectangular" height="10px" sx={{ marginBottom: "10px" }} />
          <Skeleton variant="rectangular" height="10px" sx={{ marginBottom: "10px" }} />
          <Skeleton variant="rectangular" height="10px" />
        </Box>
        <Skeleton variant="rectangular" height="20px" width="30%" sx={{ borderRadius: 1 }} />
      </Box>
    </CardContent>
  </Card>
);
