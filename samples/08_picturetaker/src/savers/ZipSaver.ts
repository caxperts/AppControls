import JSZip from "jszip";
import { IFileSaver, TakenImage } from "./IFileSaver";
import { Application } from "@caxperts/universal.api";


export class ZipFileSaver implements IFileSaver {
    constructor() { }

    async save(images: TakenImage[]) {

        var zip = new JSZip();
        // we add each file to the Zip and at the end save it and provide it to the user
        images.forEach(image => {
            zip.file(`${image.TagKey}/${image.TagValue}.png`, image.ImageAsBase64, { base64: true });
        });

        const result = await zip.generateAsync({ type: "base64" });
        await Application.getInstance().FileOperations.saveFileDialog(result, "zip", "export.zip");
    }
}