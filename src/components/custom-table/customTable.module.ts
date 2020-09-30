import { IInjectorModule, IInjector } from "@paperbits/common/injection"
import { CustomTableViewModel } from "./customTableViewModel"
import { CustomTableModelBinder } from "./customTableModelBinder"
import { CustomTableViewModelBinder } from "./customTableViewModelBinder"

export class CustomTableModule implements IInjectorModule{
    public register(injector : IInjector) : void{
        injector.bind("customTable", CustomTableViewModel);
        injector.bindToCollection("modelBinders", CustomTableModelBinder);
        injector.bindToCollection("viewModelBinders", CustomTableViewModelBinder);
    }
}