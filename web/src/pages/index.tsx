import { Layout } from "../components/Layout";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import {useState} from 'react'; 
import { Main } from "../components/Main";
import { Cards } from "../components/Cards";
import { FullImg } from "../components/FullImg";
import { Panels } from "../components/Panel";

interface IndexProps {}
 
const Index: React.FC<IndexProps> = ({}) => {
    const [variables, setVariables] = useState({limit: 10, cursor: null as null | string});

    return (
        <Layout variant="small">
                <Main />
                <Cards />
                <FullImg /> 
                <Panels />
        </Layout>
    )
}
//only srr should be used when needed
export default withUrqlClient(createUrqlClient)(Index); 