import React from "react";
import Controls from "./Controls";
import { WithGardenerContext } from "./Context";
import ImageClassification from "./ImageClassification";


function GardenPanel() {

    return <div>
        <Controls />
        <ImageClassification />
    </div>
}


export default WithGardenerContext(
    GardenPanel
);