import { IWidgetOrder, IWidgetHandler } from "@paperbits/common/editing";
import { CustomTableModel } from "./customTableModel";

export class CustomTableHandlers implements IWidgetHandler{
    public async getWidgetOrder(): Promise<IWidgetOrder>{
        const widgetOrder: IWidgetOrder = {
            name: "customTable",
            displayName: "Custom table",
            iconClass: "paperbits-puzzle-10",
            requires: ["html", "js"],

            createModel: async() => {
                return new CustomTableModel();
            }
        };

        return widgetOrder;
    }
}