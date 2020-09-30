import * as ko from "knockout";
import template from "./customTable.html";
import { Component } from "@paperbits/common/ko/decorators";
import { compileComponentFromMetadata } from "@angular/compiler";

@Component({
    selector: "custom-table",
    template: template
})
export class CustomTableViewModel{
    public readonly urlPath: ko.Observable<string>;
    public readonly authorization: ko.Observable<string>;
    public readonly style: ko.Observable<string>;

    constructor(){
        this.urlPath = ko.observable();
        this.authorization = ko.observable();
        this.style = ko.observable();
    }
}
