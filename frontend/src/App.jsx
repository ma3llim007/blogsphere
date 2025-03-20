import AdminApp from "./admin/AdminApp";
import ClientApp from "./client/ClientApp";

const App = () => {
    // Check if the URL starts with "/admin"
    const isAdmin = window.location.pathname.startsWith("/admin/");
    
    return isAdmin ? <AdminApp /> : <ClientApp />;
};

export default App;
