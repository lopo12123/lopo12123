import { Link } from "react-router-dom";
import { useToastStore } from "@/scripts/misc";

export default function NavigationMenu() {
    const useToast = useToastStore()

    return (
        <div>
            <div className="drag-controller">
                Navigation menu
            </div>
            {/*<button onClick={() => {*/}
            {/*    useToast.info('message')*/}
            {/*}}>toast</button>*/}
            {/*<button onClick={() => {*/}
            {/*    useToast.clear()*/}
            {/*}}>clear</button>*/}
            {/*<Link to="/">home</Link> <br/>*/}
            {/*<Link to="/vite-react-ts">vite-react-ts</Link> <br/>*/}
            {/*<Link to="/vite-vue-ts">vite-vue-ts</Link> <br/>*/}
        </div>
    )
}