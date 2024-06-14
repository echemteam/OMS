export const contactTransformData = (data) => {
    return data.reduce((acc, item) => {
        const { type, firstName, lastName, emailAddress, contactId, contactTypeId, customerContactId } = item;

        const transformedItem = {
            cardInformation: {
                firstName,
                lastName,
                emailAddress,
                contactId,
                contactTypeId,
                customerContactId
            },
        };

        if (!acc[type]) {
            acc[type] = [];
        }

        acc[type].push(transformedItem);
        return acc;
    }, {});
};