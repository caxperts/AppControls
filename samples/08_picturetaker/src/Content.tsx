import { Application, BoundsInfo, FileDialogApiReturnType, FilterOperation3d, ModelObject, Scene3d } from "@caxperts/universal.api";
import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { utils, read } from "xlsx";
import { IFileSaver, TakenImage } from "./savers/IFileSaver";
import { ZipFileSaver as ZipFileSaver } from "./savers/ZipSaver";
import { PdfFileSaver as PdfFileSaver } from "./savers/PdfSaver";

const CONFIG = {
    DELAY_TIME: 2000,
    BOUNDS_INCREASE: 3000,
    IMAGE_SIZE_X: 1920,
    IMAGE_SIZE_Y: 1080,
    FIELD_OF_VIEW: 60,
} as const;

async function Delay(delay: number) {
    return new Promise(resolve => setTimeout(resolve, delay));
}

function getBounds(objects: ModelObject[]) {
    var bounds: BoundsInfo | null = null;
    objects.forEach(element => {
        if (bounds == null) {
            bounds = element.Bounds!;
        } else {
            bounds.HighX = Math.max(bounds.HighX!, element.Bounds!.HighX + CONFIG.BOUNDS_INCREASE);
            bounds.HighY = Math.max(bounds.HighY!, element.Bounds!.HighY + CONFIG.BOUNDS_INCREASE);
            bounds.HighZ = Math.max(bounds.HighZ!, element.Bounds!.HighZ + CONFIG.BOUNDS_INCREASE);

            bounds.LowX = Math.min(bounds.LowX!, element.Bounds!.LowX - CONFIG.BOUNDS_INCREASE);
            bounds.LowY = Math.min(bounds.LowY!, element.Bounds!.LowY - CONFIG.BOUNDS_INCREASE);
            bounds.LowZ = Math.min(bounds.LowZ!, element.Bounds!.LowZ - CONFIG.BOUNDS_INCREASE);
        }
    });

    return bounds!;
}

export default function Content() {

    const [log, setLog] = useState<string>("No");
    // small helper function to make add lines to the message log
    function AddToLog(message: string) {
        setLog(x => x + "\r\n" + message);
    }

    async function loadExcelFile() {
        const loadOperation = await Application.getInstance().FileOperations.loadFileDialog("xlsx");

        if (loadOperation.ResultType !== FileDialogApiReturnType.Ok) {
            AddToLog("No file selected");
            return null;
        }

        const workbook = read(loadOperation.DataBase64, { type: 'base64' });
        return utils.sheet_to_json<{ [key: string]: string; }>(workbook.Sheets[workbook.SheetNames[0]]);
    }

    async function takePicture(tagKey: string, tagValue: string, filter: FilterOperation3d, scene: Scene3d) {
        filter.Condition = `${tagKey}=${tagValue}`;
        // we retrieve the bounds to later the the Ui Clipping
        const objects = await filter.getObjects();
        const bounds = getBounds(objects);
        console.log(bounds)
        // Needs to wait for new Version
        /*await scene.UiClippingDescriptor.set({
            Mode: ClippingMode.Volume,
            VolumeClipping: {
                Bounds: {
                    Min: { X: bounds.LowX, Y: bounds.LowY, Z: bounds.LowZ },
                    Max: { X: bounds.HighX, Y: bounds.HighY, Z: bounds.HighZ }
                }
            }
        });*/
        // We will fit and highlight each element
        await filter.fit();
        await filter.highlight();
        // To ensure enough time to load the model if required. Might be replaced in future with an API call
        await Delay(CONFIG.DELAY_TIME);
        // We take the screenshot. Could be extended to take multiple screenshots. For example multiple directions and isometric
        return await scene.takeScreenshot(CONFIG.IMAGE_SIZE_X, CONFIG.IMAGE_SIZE_Y, CONFIG.FIELD_OF_VIEW);
    }

    async function process(saver: IFileSaver) {
        setLog("Start Processing");
        // We ask the user for the excel file containing the Tags and load it. If no file is provided we stop execution
        const loadedData = await loadExcelFile();
        if (!loadedData) return;

        const scene = (await Application.getInstance().Scenes3d.get())[0];
        const filter = scene.getNewFilter();
        // remove active selection so they are not seen in screenshots
        filter.clearSelection();
        //In the future we would also set the bounding box. So we need to retrieve the bounds of the elements
        filter.IncludeBoundingBox = true;

        let images: TakenImage[] = [];
        //We get a list of all KeyValue Pairs from the excel file. The way we load it __rowNum__ is contained in each dictionary so we filter it out
        const loadedDataClean = loadedData.flatMap(x => Object.entries(x).filter(x => x[0] != "__rowNum__"));
        for (let index = 0; index < loadedDataClean.length; index++) {
            // If there is no ag in the model this will cause exceptions from the api so add try catch
            try {
                const tag = loadedDataClean[index];
                const picture = await takePicture(tag[0], tag[1], filter, scene);
                images.push({ ImageAsBase64: picture.ImageData, TagKey: tag[0], TagValue: tag[1] });
                AddToLog(`Captured ${index + 1} of ${loadedDataClean.length}`);
            } catch (error) {
                AddToLog(`Failed ${index + 1} of ${loadedDataClean.length}`);
            }
        }
        //Reset highlighting
        filter.clearHighlight();
        AddToLog("Generating File");
        //small delay to refresh log
        await Delay(10)
        //Run either PDF or Zip saver
        await saver.save(images);
        AddToLog("Finished");
    }

    return <>
    <Stack direction={"row"}>
        <Button variant="contained" onClick={() => process(new PdfFileSaver())}>Generate PDF</Button>
        <Button variant="contained" onClick={() => process(new ZipFileSaver())}>Generate Zip</Button>
    </Stack>
        <br/>
        <TextField multiline value={log} />
    </>;
}