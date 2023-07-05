import './zote.scss'
import {RULES} from "@/constants/zote";

const PageZote = () => {
    return (
        <div className="page-zote" dir="ltr">
            {
                RULES.map((rule, idx) => {
                    return <p key={idx} className="rule">{rule}</p>
                })
            }
        </div>
    )
}

export default PageZote