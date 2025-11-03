import { Navigate } from "react-router";
import { useAuth } from "../hook/useAuth";
import type { ReactNode } from "react";
import { Loading } from "../../../shares/components/Loading";
import { Box } from "@mui/material";
import { styles } from "../../grammar/styles/style";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  if (loading)
    return (
      <Box sx={styles.box.mainContent}>
        <Loading />
      </Box>
    );
  return user ? <>{children}</> : <Navigate to="/login" replace />;
}
