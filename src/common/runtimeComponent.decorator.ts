import * as ReactDOM from "react-dom";
import { createElement } from "react";

export function RuntimeComponent(config: any): (target:any) => void{
    return (target) => {
        class RuntimeComponentProxy extends HTMLElement{
            constructor(){
                super();
            }

            onchange = (e: any) => {};

            public connectedCallback() : void {
                const element = <HTMLElement>this;

                setTimeout( () => {
                    let props = {};

                    for(let i = 0; i < element.attributes.length; i ++){
                        let newAttribute = element.attributes[i];
                        props[newAttribute.name] = newAttribute.value;
                    }

                    const reactElement = createElement(target, props);
                    ReactDOM.render(reactElement, element);
                },10);
            }
        }

        customElements.define(config.selector, RuntimeComponentProxy);
    };
}