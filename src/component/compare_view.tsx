import { Config } from "../cfg";

export interface ComponentConfig extends Config {
    create_controls?: boolean;
}

const CompareView = (config: ComponentConfig) => {
    return <h1>Hello World!</h1>;
}

export default CompareView;

