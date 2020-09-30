import * as React from "react";
import { forwardRef } from "react";
import { RuntimeComponent } from "../../../common/runtimeComponent.decorator";
import MaterialTable, { Icons } from "material-table";
import AddBox from "../../../../../node_modules/@material-ui/icons/AddBox"
import ArrowDownward from "../../../../../node_modules/@material-ui/icons/ArrowDownward"
import Check from "../../../../../node_modules/@material-ui/icons/Check"
import ChevronLeft from "../../../../../node_modules/@material-ui/icons/ChevronLeft"
import ChevronRight from "../../../../../node_modules/@material-ui/icons/ChevronRight"
import Clear from "../../../../../node_modules/@material-ui/icons/Clear"
import DeleteOutline from "../../../../../node_modules/@material-ui/icons/DeleteOutline"
import Edit from "../../../../../node_modules/@material-ui/icons/Edit"
import FilterList from "../../../../../node_modules/@material-ui/icons/FilterList"
import FirstPage from "../../../../../node_modules/@material-ui/icons/FirstPage"
import LastPage from "../../../../../node_modules/@material-ui/icons/LastPage"
import Remove from "../../../../../node_modules/@material-ui/icons/Remove"
import SaveAlt from "../../../../../node_modules/@material-ui/icons/SaveAlt"
import Search from "../../../../../node_modules/@material-ui/icons/Search"
import ViewColumn from "../../../../../node_modules/@material-ui/icons/ViewColumn"

var tableIcons: Icons;
tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
}

@RuntimeComponent({
    selector: "custom-table-runtime"
})
export class CustomTableRuntime extends React.Component{
    public state: any;
    private style: object;
    private options: object;

    public getColumns (dataResult: Array<any>): Array<any>{
        var columns = Object.keys(dataResult[0]);

        return columns.map((column) => {
            var newColumn = { title: column, field: column };
            return newColumn;
        })
    }

    public updateRow(newRow, oldRow): Promise<any>{
        var index = oldRow["tableData"].id;

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                this.setState((state) => {
                    const list = this.state.rows.map((item, i) => {
                        if (i === index){
                            return newRow;
                        } else {
                            return item;
                        }
                    });

                    return {
                        rows: list
                    };
                });
                resolve();
            }, 1000)
        })
    }

    public addRow(newRow): Promise<any>{
        var that = this;

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                that.setState((state) => {
                    const list = this.state.rows.concat(newRow);

                    return {
                        rows: list
                    };
                });
                resolve();
            }, 1000)
        })
    }

    public removeRow(oldRow): Promise<any>{
        var index = oldRow["tableData"].id;

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                this.setState((state) => {
                    const list = this.state.rows.filter((item, j) => index !== j);

                    return {
                        rows: list
                    };
                });
                resolve();
            }, 1000)
        })
    }

    constructor(props){
        debugger;
        super(props);

        this.state = {
            columns: [],
            rows: [],
            urlPath: "",
            authorization: ""
        }

        if(props.urlpath){
            this.state.urlPath = props.urlpath;
        }

        if(props.authorization){
            this.state.authorization = props.authorization;
        }

        if(props.style){
            this.options={
                headerStyle: { color: props.style }
            };
        }
    }

    componentDidMount(){
        debugger;
        var headers = new Headers();
        headers.append("Authorization", this.state.authorization);

        var request = new Request(this.state.urlPath,{
            headers: headers,
            mode: "cors",
            //credentials: "include"
        });

        var self = this;

        fetch(request)
        .then((response) => {
            return response.json();
        })
        .then(function(data){
            self.setState({
                columns: self.getColumns(data.data),
                rows: data.data.map((row) => {
                    let newRow = row;
                    newRow._links = null;
                    return newRow;
                })
            })
        })
        .catch((error) => {
            self.setState({
                error: error.message
            });
        });
    }

    public render(): JSX.Element{
        if(!this.state.error && this.state.rows){
            return (
                <div style={this.style}>
                    <MaterialTable
                        title="Title should be editable"
                        columns={this.state.columns}
                        data={this.state.rows}
                        icons={tableIcons}
                        options={this.options}
                        editable={{
                            onRowAdd: (newData) => this.addRow(newData),
                            onRowUpdate: (newData, oldData) => this.updateRow(newData,oldData),
                            onRowDelete:(oldData) => this.removeRow(oldData)
                        }}
                    />
                </div>
            );
        } else{
        return <span>Error loading table: { this.state.error }</span>
        }
    }
}