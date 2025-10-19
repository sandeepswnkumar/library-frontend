import AuthLayout from "@/components/auth/AuthLayout";
import { assets } from "@/assets/assets";
import { useMemo } from "react";

function Page() {
  const bgStyle = useMemo(
    () => ({
      background: `url(${assets.LoginBg.src})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    }),
    []
  );
  return (
    <div style={bgStyle}>
      <AuthLayout />
    </div>
  );
}

export default Page;
