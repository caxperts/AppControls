


export interface IFileSaver {
    save: (images: TakenImage[]) => Promise<void>;
}

export interface TakenImage {
    ImageAsBase64: string;
    TagKey: string;
    TagValue: string;
}