import MidLayer from "@shell/test/MidLayer"
import EndLayer from "@shell/test/EndLayer"
import { createContext, useState } from "react";

export const CtxTest = createContext<any>(null)

export const TestView = () => {
    const [ topData, setTopData ] = useState(1)

    return (
        <div>
            <br/> <br/>
            <button onClick={ () => {
                setTopData(topData + 1)
            } }>
                do add
            </button>
            <br/> <br/>
            <CtxTest.Provider key="ctx-test" value={topData}>
                <MidLayer key="layer1" level={ 1 }
                          innerEl={
                              <MidLayer key="layer2" level={ 2 }
                                        innerEl={
                                            <MidLayer key="layer3" level={ 3 }
                                                      innerEl={
                                                          <EndLayer/>
                                                      }/>
                                        }/>
                          }/>
            </CtxTest.Provider>
        </div>
    )
}