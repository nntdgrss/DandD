import { Navigate, useParams } from "react-router";
import { useMemo } from "react";

export default function TablePage() {
  const params = useParams();

  const table = useMemo(() => {
    return params.table;
  }, [params.table]);

  if (!table) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p>Table {table}</p>
    </div>
  );
}
