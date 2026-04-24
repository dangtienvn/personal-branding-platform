import AdminHeader from "@/components/admin/AdminHeader";
import AdminSider from "@/components/admin/AdminSider";

export const metadata = {
  title: "Admin Panel",
};

export default function AdminLayout({ children }) {
  return (
    <>
        <head>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
          <link rel="stylesheet" href="/admin/css/style.css" />
        </head>
        <AdminHeader />
        <div className="body">
            <AdminSider />
            <div className="main">
                {children}
            </div>
        </div>
    </>
  );
}
