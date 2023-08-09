import {handleError} from "../error/handle.error";

export const isLoggedInMiddleware = async (req, getAuthUser) => {
    const authUser = await getAuthUser(req);

    if (!authUser) {
        handleError('You are not logged in', 'AUTHENTICATION_ERROR')
    }
};
