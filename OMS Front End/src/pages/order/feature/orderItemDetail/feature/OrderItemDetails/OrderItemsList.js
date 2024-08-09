/* eslint-disable react-hooks/exhaustive-deps */
import { useRef } from "react";
// import MolGrid from "../../../../../../components/Grid/MolGrid";
import CardSection from "../../../../../../components/ui/card/CardSection";
import { orderItemSelectList } from "./config/OrderItem.data";
import FinalMolGrid from "../../../../../../components/FinalMolGrid/FinalMolGrid";

const OrderItemsList = () => {

    const molGridRef = useRef();

    return (
        <CardSection cardTitle="Order Item List">
            <FinalMolGrid
                ref={molGridRef}
                configuration={orderItemSelectList}
                allowPagination={false}
            />
        </CardSection>
    )
}

export default OrderItemsList;