import { CustomTableModule } from "./customTable.module"
import { IInjectorModule, IInjector } from "@paperbits/common/injection"
import { CustomTableEditor } from "./customTableEditor"
import { CustomTableHandlers } from "./customTableHandlers"

export class CustomTableEditorModule implements IInjectorModule{
    public register(injector : IInjector) : void{
        injector.bindModule(new CustomTableModule());
        injector.bind("customTableEditor", CustomTableEditor);
        injector.bindToCollection("widgetHandlers", CustomTableHandlers);
    }
}