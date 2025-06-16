import { signOut } from "firebase/auth";
import { auth } from "../../../Auth/Firebase/Firebase.config";

export const handleSignOut = async () => {
    
    // handling signout in try catch
    try {
        await signOut(auth);
        console.log("Signed out");
        return true
    } catch (error) {
        console.log("Error in sign out: ", error)

        // returning bool value for result;
        return false;
    }
}