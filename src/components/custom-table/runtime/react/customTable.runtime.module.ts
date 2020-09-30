import { IInjector, IInjectorModule } from "@paperbits/common/injection"
import { CustomTableRuntime } from "./custom-table-runtime"

export class CustomTableRuntimeModule implements IInjectorModule{
    public register(injector: IInjector): void{
        injector.bind("customTableRuntime", CustomTableRuntime);
    }
}