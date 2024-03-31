import GardenPanel from "../components/GardenPanel/GardenPanel";
import { useAuth } from "../context/AuthContext";
import AuthenticatedGuard from "../guards/Authenticated";

function ProfilePage() {
    const { user } = useAuth()

    return <div className="grid place-items-center p-4">
        <GardenPanel/>
    </div>
}

export default ProfilePage