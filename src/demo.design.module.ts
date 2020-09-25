/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file and at https://paperbits.io/license/mit.
 */


import { IInjector, IInjectorModule } from "@paperbits/common/injection";
import { App } from "./app/app";
import { ConsoleLogger } from "@paperbits/common/logging";
import { SearchDesignModule } from "@paperbits/core/search/search.design.module";
import { StaticObjectStorage } from "./staticObjectStorage";
import { StaticBlobStorage } from "./staticBlobStorage";
import { StaticRoleService } from "./staticRoleService";
import { ClickCounterEditorModule } from "./click-counter/ko/clickCounterEditor.module";
import { HistoryRouteHandler } from "@paperbits/common/routing";
import { CustomTableEditorModule } from "./custom-table/customTableEditor.module"


export class DemoDesignModule implements IInjectorModule {
    public register(injector: IInjector): void {
        injector.bindSingleton("app", App);
        injector.bindSingleton("blobStorage", StaticBlobStorage);
        injector.bindSingleton("roleService", StaticRoleService);
        injector.bindSingleton("objectStorage", StaticObjectStorage);
        injector.bindToCollection("autostart", HistoryRouteHandler);
        injector.bindSingleton("logger", ConsoleLogger);
        injector.bindModule(new SearchDesignModule());
        injector.bindModule(new ClickCounterEditorModule());
        injector.bindModule(new CustomTableEditorModule());
    }
}