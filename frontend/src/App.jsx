import AdminRoutes from "./routes/AdminRoutes";
import ClientRoutes from "./routes/ClientRoutes";
import ModeratorRoutes from "./routes/ModeratorRoutes";
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

    return <>{role === "admin" ? <AdminRoutes /> : role === "moderator" ? <ModeratorRoutes /> : role === "writer" ? <WriterRoutes /> : <ClientRoutes />}</>;
};

export default App;
