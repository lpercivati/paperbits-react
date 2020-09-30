import * as ko from "knockout";
import template from "./customTableEditor.html";
import { CustomTableModel } from "./customTableModel";
import { Component, OnMounted, Param, Event } from "@paperbits/common/ko/decorators";
import { WidgetEditor } from "@paperbits/common/widgets";

@Component({
    selector: "custom-table-editor",
    template: template
})

export class CustomTableEditor implements WidgetEditor<CustomTableModel>{
    public readonly urlPath: ko.Observable<string>;
    public readonly authorization: ko.Observable<string>;
    public readonly style: ko.Observable<string>;

    constructor(){
        this.urlPath = ko.observable("");
        this.authorization = ko.observable("");
        this.style = ko.observable("");
    }

    @Param()
    public model: CustomTableModel;

    @Event()
    public onChange:(model: CustomTableModel) => void;

    @OnMounted()
    public async initialize(): Promise<void>{
        this.urlPath(this.model.urlPath?.toString());
        this.authorization(this.model.authorization?.toString());
        this.style(this.model.style?.toString());

        this.urlPath.subscribe(this.applyChanges);
        this.authorization.subscribe(this.applyChanges);
        this.style.subscribe(this.applyChanges);
    }

    private applyChanges(): void{
        debugger;
        this.model.urlPath = this.urlPath();
        this.model.authorization = this.authorization();
        this.model.style = this.style();
        this.onChange(this.model);
    }
}