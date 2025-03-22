import AdminRoutes from "./routes/AdminRoutes";
import ModeratorRoutes from "./routes/ModeratorRoutes";
import PublicRoutes from "./routes/PublicRoutes";
import WriterRoutes from "./routes/WriterRoutes";

const App = () => {
    // Check if the URL starts with "/admin"
    const path = window.location.pathname;

    // Determine Role From Pathname
    let role = "public";
    if (path.startsWith("/admin")) {
        role = "admin";
    } else if (path.startsWith("/moderator")) {
        role = "moderator";
    } else if (path.startsWith("/writer")) {
        role = "writer";
    }

    return <>{role === "admin" ? <AdminRoutes /> : role === "moderator" ? <ModeratorRoutes /> : role === "writer" ? <WriterRoutes /> : <PublicRoutes />}</>;
};

export default App;
