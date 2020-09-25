import { IModelBinder } from "@paperbits/common/editing"
import { CustomTableModel } from "./customTableModel"
import { Contract } from "@paperbits/common"
import { CustomTableContract } from "./customTableContract"

export class CustomTableModelBinder implements IModelBinder<CustomTableModel>{
    public canHandleContract(contract: Contract): boolean{
        return contract.type === "custom-table";
    }

    public canHandleModel(model: CustomTableModel): boolean{
        return model instanceof CustomTableModel;
    }

    public async contractToModel(contract: CustomTableContract): Promise<CustomTableModel>{
        const model = new CustomTableModel();
        model.urlPath = contract.urlPath;
        model.authorization = contract.authorization;
        model.style = contract.style;

        return model;
    }

    public modelToContract(model: CustomTableModel): Contract {
        const contract: CustomTableContract = {
            type: "custom-table",
            urlPath: model.urlPath,
            authorization: model.authorization,
            style: model.style
        };

        return contract;
    }
}