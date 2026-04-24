import Link from "next/link";

export default function AdminHeader() {
    return (
        <header className="header">
            <div className="container-fluid">
                <div className="row align-items-center">
                    <div className="col-3">
                        <div className="inner-logo">
                            <Link href="/admin/dashboard">ADMIN</Link>
                        </div>
                    </div>
                    <div className="col-9">
                        {/* Empty column from pug */}
                    </div>
                </div>
            </div>
        </header>
    );
}
