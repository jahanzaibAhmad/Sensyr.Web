
    export interface VariantModel {
        VariantDescription: string;
        VariantId: number;
    }


    export interface GatewayPortModel {
        GatewayPortID: number;
        GatewayID: string;
        PortName: string;
        DateCreated: Date;
    }

    export interface GatewayListModel {
        GatewayID: string;
        VariantId: number;
        GatewayName: string;
        DateCreated: Date;
        BranchID: number;
        GatewayPorts: GatewayPortModel[];
    }
