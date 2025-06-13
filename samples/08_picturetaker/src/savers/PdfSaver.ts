import { Application } from "@caxperts/universal.api";
import { IFileSaver, TakenImage } from "./IFileSaver";
import { jsPDF } from "jspdf";

export class PdfFileSaver implements IFileSaver {
    constructor() { }

    private calculateImageDimensions(originalWidth: number, originalHeight: number, maxWidth: number, maxHeight: number): { width: number; height: number; } {
        const aspectRatio = originalWidth / originalHeight;

        // Start by trying to fit the width
        let width = maxWidth;
        let height = width / aspectRatio;

        // If height exceeds the limit, scale by height instead
        if (height > maxHeight) {
            height = maxHeight;
            width = height * aspectRatio;
        }

        return { width, height };
    }

    async save(images: TakenImage[]) {
        const doc = new jsPDF({
            orientation: "landscape",
            //turning this on makes PDFs way smaller (5-6x) but it takes way longer
            compress: false,
        });

        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();

        // Image settings
        const margin = 20;
        const maxImageWidth = pageWidth - (margin * 2);
        const headerHeight = 25;
        const maxImageHeight = pageHeight - (margin * 2) - headerHeight;
        const { width, height } = this.calculateImageDimensions(1920, 1080, maxImageWidth, maxImageHeight);


        let isFirstImage = true;
        //we sort them first by the key so all Elements with the same tag key belog together
        images.sort((a, b) => a.TagKey.localeCompare(b.TagKey)).forEach(image => {
            if (!isFirstImage) {
                doc.addPage();
            }
            isFirstImage = false;

            // Create a header
            doc.setFontSize(16);
            doc.text(`${image.TagKey}: ${image.TagValue}`, pageWidth / 2, margin + 5, { align: 'center' });
            doc.setLineWidth(0.5);
            doc.line(margin, margin + 10, pageWidth - margin, margin + 10);

            // Add the image
            doc.addImage(
                `data:image/png;base64,${image.ImageAsBase64}`,
                'PNG',
                margin,           // x position
                margin + headerHeight,           // y position
                width,    // width
                height    // height
            );
        });

        const pdfDataUri = doc.output('datauristring');
        const base64Content = pdfDataUri.split(',')[1];
        await Application.getInstance().FileOperations.saveFileDialog(base64Content, "pdf", "export.pdf");

    }
}