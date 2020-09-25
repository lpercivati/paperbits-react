import { CustomTableViewModel } from "./customTableViewModel";
import { ViewModelBinder } from "@paperbits/common/widgets";
import { CustomTableModel } from "./customTableModel";
import { EventManager } from "@paperbits/common/events";
import { IWidgetBinding } from "@paperbits/common/editing";
import { Bag } from "@paperbits/common";

export class CustomTableViewModelBinder implements ViewModelBinder<CustomTableModel, CustomTableViewModel>{
    constructor(private readonly eventManager: EventManager){}

    public async modelToViewModel(
        model: CustomTableModel, 
        viewModel?: CustomTableViewModel, 
        bindingContext?: Bag<any>): 
        Promise<CustomTableViewModel>{
            if(!viewModel){
                viewModel = new CustomTableViewModel();
            }

            viewModel.urlPath(model.urlPath);
            viewModel.authorization(model.authorization);
            viewModel.style(model.style);

            const binding: IWidgetBinding<CustomTableModel> = {
                name: "custom-table",
                displayName: "Custom table",
                readonly: bindingContext ? bindingContext.readonly : false,
                model: model,
                draggable: true,
                editor: "custom-table-editor",
                applyChanges: async () => {
                    await this.modelToViewModel(model, viewModel, bindingContext);
                    this.eventManager.dispatchEvent("onContentUpdate");
                }
            };

            viewModel["widgetBinding"] = binding;

            return viewModel;
    }

    public canHandleModel(model: CustomTableModel): boolean{
        return model instanceof CustomTableModel;
    }
}