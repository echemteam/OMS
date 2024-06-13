export const transformData = (data) => {
    return data.reduce((acc, item) => {
        const { type, firstName, lastName, emailAddress, contactId, contactTypeId } = item;

        const transformedItem = {
            cardInformation: {
                firstName,
                lastName,
                emailAddress,
                contactId,
                contactTypeId
            },
        };

        if (!acc[type]) {
            acc[type] = [];
        }

        acc[type].push(transformedItem);
        return acc;
    }, {});
};