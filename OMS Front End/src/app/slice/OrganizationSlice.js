import { createSlice } from "@reduxjs/toolkit";
import { createCookie, getCookie } from "../../utils/Cookies/CookieHandler";

const setting = getCookie('organizationSettings');

const organiazationSlice = createSlice({
    name: "organization",
    initialState: {
        otherCharge: setting?.otherCharge,
        shippingSetting: setting?.shippingSetting,
        accountingSetting: setting?.accountingSetting
    },
    reducers: {
        setOrganizationSettings: (state, action) => {
            const { otherCharge, shippingSetting, accountingSetting } = action.payload;

            state.otherCharge = otherCharge;
            state.shippingSetting = shippingSetting;
            state.accountingSetting = accountingSetting;

            const cookieValue = {
                otherCharge,
                shippingSetting,
                accountingSetting
            };

            let request = {
                cookieValue: cookieValue,
                cookieName: 'organizationSettings',
                expirationTime: 480
            };
            createCookie(request);
        }
    }
})

export const { setOrganizationSettings } = organiazationSlice.actions;

export default organiazationSlice.reducer;