import { useRouter } from "next/navigation";
import { useEffect } from "react";


const AdminRoute = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin/login"); // Redirect to login if no token
    }
  }, []);

  return <>{children}</>;
};

export default AdminRoute;
