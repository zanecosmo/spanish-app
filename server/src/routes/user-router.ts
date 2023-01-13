import { Express, Router, Request, Response } from "express";
import { BaseWordPairDTO, Database, ExtendedWordDTO } from "../types";

interface ResponseBody<T> {
    error: string | null;
    message: string | null;
    data: T | null;
};

function buildResponseBody<T>(data: T | null, errorName?: string, message?: string): ResponseBody<T> {
    return {
        data: data,
        error: errorName ? errorName : null,
        message: message ? message : null
    };
};

const DeconstructError = (error: any) => {
    if (error instanceof Error) return error;
    else return { name: "UNKNOWN", message: "NON-ERROR COUGHT IN TRY-CATCH" };
};

export const enableUserRouter = (app: Express, database: Database): void => {
    const router: Router = Router();

    router.get("/get-word-pairs", async (req: Request, res: Response): Promise<void> => {
        try {
            const baseWordPairDTOs: Array<BaseWordPairDTO> = await database.getBaseWordPairs(req.body.user);
            res.status(200).send(buildResponseBody(baseWordPairDTOs));
        }
        catch (error) {
            const { name, message } = DeconstructError(error);
            res.status(500).send(buildResponseBody(null, name, message));
        };
    });
    
    router.get("/get-word/:wordId", async (req: Request, res: Response): Promise<void> => {
        try {
            const wordId = parseInt(req.params.wordId, 10);
            const word: ExtendedWordDTO = await database.getWord(wordId, req.body.user);
            console.log(word);
            res.status(200).send(buildResponseBody(word));
        } 
        catch (error) {
            res.status(500).send({ error: error });
        };
    });
    
    router.put("/update-difficulties", async (req: Request, res: Response): Promise<void> => {
        try {
            await database.updateDifficulties(req.body.difficulties, req.body.user);
            res.status(200).send({ success: true });
        } catch (error) {
            res.status(500).send({ error: error });
        };
    });
    
    router.put("/update-group", async (req: Request, res: Response): Promise<void> => {
        try {
            await database.updateGroup(req.body.group, req.body.user);
            res.status(200).send({ success: true });
        }
        catch (error) {
            res.status(500).send({ error: error });
        };
    });

    app.use(router);
};