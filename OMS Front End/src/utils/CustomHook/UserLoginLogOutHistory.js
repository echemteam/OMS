import { useAddUserLoginLogoutHistoryMutation } from "../../app/services/userAPI";

export const useUserHistory = () => {
    const [addHistory] = useAddUserLoginLogoutHistoryMutation();

    const addUserHistory = async (requestData) => {
        await addHistory(requestData);
    }

    return { addUserHistory };
}