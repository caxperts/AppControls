import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'
import cors from 'cors'
import {getDemoData} from './DemoData'
import { StatusEnum } from './Enum';

const prisma = new PrismaClient()

// Setup the database by deleting all old data and creating new demo Data. DEMO MODE
async function setupDatabase() {
    console.log("deleting old data")
    await prisma.elementStatus.deleteMany();
    console.log("Inserting demo data")
    await prisma.elementStatus.createMany({
        data: getDemoData()
    })
}
// create a new express server
const app = express();
// use Cors to define what websites can connent. in this case we allow everything
app.use(cors())
// We expect JSON in and output so we tell express to use json
app.use(express.json());
// get the port from the config file
const port = process.env.PORT || 3000;

// endpoint that retrieves all elements
app.get('/status', async (req: Request, res: Response) => {
    res.send(await prisma.elementStatus.findMany());
});

// Endpoint to update an individual element
app.post('/updateStatus', async (req: Request, res: Response) => {
    // if a invalid status was provided we return a 400 status
    if(!(req.body["currentElementStatus"] in StatusEnum)){
        res.status(400).send("Invalid Status")
        return;
    }
    // we try updateing the element. This will throw an exeption if the element doesnt exist
    try {
        await prisma.elementStatus.update({
            data: {
                currentElementStatus: req.body["currentElementStatus"] as string
            },
            where: {
                elementName: req.body["elementName"] as string
            }
        })
    } catch (error) {
        // incase an error happend repont with a 400
        res.status(400).send("Unkown element")
        return;
    }
    
    res.send("Updated status")
});

// First setup the database and then start the server on the specified port
setupDatabase().then(() => {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
})
