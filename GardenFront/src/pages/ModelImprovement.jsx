import AuthenticatedAdminGuard from "../guards/AuthenticatedAdmin";


function ModelImprovement() {
    return <div>If you reached here, you are an admin (:</div>
}

export default AuthenticatedAdminGuard(ModelImprovement)