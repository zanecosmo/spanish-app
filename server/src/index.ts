import express, {Express, Request, Response} from "express";
import { verb } from "./test-verb";
import { database } from "./sql/database/database";

const app: Express = express();

const run = async (): Promise<void> => {
    await database.connect();
    app.listen(8000, async (): Promise<void> => {
        console.log("YOUR SERVER IS RUNNING ON 8000, YOU'D BETTER GO CATCH IT");
        const wordId = await database.updateWord(verb);
        console.log(wordId);
    });
};

app.use(express.json());

app.post("/add-word", async (req: Request, res: Response): Promise<void> => {
    try {
        const parentId = await database.insertWord(req.body);
        res.status(200).send({ parentId: parentId });
    }
    catch (error) {
        res.status(500).send({ message: error });
    };
});

app.get("/test-get-word", async (req: Request, res: Response): Promise<void> => {
    // req should have the type of word in the 
    console.log(req.body);
    res.send({ butt: "GET" });
});

app.get("/test-get-all", async (req: Request, res: Response): Promise<void> => {
    console.log(req.body);
    // 
    res.send({ butt: "GET ALL" });
});

app.put("/test-put", async (req: Request, res: Response): Promise<void> => {
    console.log(req.body);
    res.send({ butt: "PUT" });
});

app.delete("/delete-word", async (req: Request, res: Response): Promise<void> => {
    try {
        await database.deleteWord(req.body);
        res.status(204);
    }
    catch (error) {
        res.status(500).send({ message: error });
    };
});

run();

