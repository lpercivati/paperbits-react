import { Contract } from "@paperbits/common";

export interface CustomTableContract extends Contract {
    urlPath: string;
    authorization: string;
    style: string;
}