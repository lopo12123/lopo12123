import './precept.scss'
import { PRECEPT } from "@/constants/precept";

const PagePrecept = () => {
    return (
        <div className="page-precept" dir="ltr">
            {
                PRECEPT.map((rule, idx) => {
                    return <div key={ idx } className="precept">{ rule }</div>
                })
            }
        </div>
    )
}

export default PagePrecept
