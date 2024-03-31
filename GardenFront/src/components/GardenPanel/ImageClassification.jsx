import { useCallback } from "react";
import { useGardener } from "./Context";
import placeholder from '../../flower.png'
import { useAuth } from "../../context/AuthContext";


function ImageClassification() {

    const { image, classifying, gardenState, isUninitialized } = useGardener()
    const { user } = useAuth()

    const Modes = useCallback(() => {
        if (classifying) {
            return <div className="text-center">Classifying..</div>
        }

        if (isUninitialized()) {
            if (image) {
                return <div className="text-center">
                    Ready for classification. waiting for instruction
                </div>
            }
            return <div className="text-center">
                Waiting for an image to be picked
            </div>
        }

        return <div className="text-center" style={{
            display:'grid',
            gridTemplateColumns: user ? '1fr 1fr' : '1fr',
            gap: '1rem'
        }}>
            <div className="border-[1px] border-[lightgray] px-2 py-4 rounded-md">

                <div className="font-bold">
                    Level of water:
                </div>
                <div>
                    <span className={gardenState.needsWater ? "font-bold text-[#bd3333]" : ''}> LOW </span>
                    ||
                    <span className={!gardenState.needsWater ? 'font-bold text-[green]' : ''}> NORMAL </span>
                </div>
                <span>
                    Reccomendation:<br />
                    {gardenState.message}
                    <br />
                </span>
            </div>

            {user && <div className="border-[1px] border-[lightgray] px-2 py-4 rounded-md">
                { /* Change here temperature to match temperature model */}
                <div className="font-bold">
                    Temperature:
                </div>
                <div>
                    <span className={gardenState.needsWater ? "font-bold text-[#bd3333]" : ''}> LOW </span>
                    ||
                    <span className={!gardenState.needsWater ? 'font-bold text-[green]' : ''}> NORMAL </span>
                </div>
                <span>
                    Reccomendation:<br />
                    {gardenState.message}
                    <br />
                </span>
            </div>}
        </div>
    }, [classifying, gardenState, image, user])

    const Image = useCallback(() => {
        return <div className={`min-h-[100px] overflow-hidden w-fit text-center m-8 rounded-md ${image ? 'border-[1px]' : ''}`}>
            <img src={image ?? placeholder} width={220} height={200} className={!image ? `opacity-[0.2]` : ``} alt="Picture corrupted" />
            {!image && <div className="p-2">No picture picked yet</div>}
        </div>
    }, [image])

    return <div className="min-w-[200px] grid place-items-center">
        <Image />
        <div>
            <Modes />
        </div>

    </div>
}

export default ImageClassification;