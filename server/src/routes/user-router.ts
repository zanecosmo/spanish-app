import { Express, Router, Request, Response } from "express";
import { BaseWordPairDTO, Database, ExtendedWordDTO } from "../types";
import { buildResponseBody, DestructureError } from "../utils";

export const enableUserRouter = (app: Express, database: Database): void => {
    const router: Router = Router();

    router.get("/get-word-pairs", async (req: Request, res: Response): Promise<void> => {
        try {
            const baseWordPairDTOs: Array<BaseWordPairDTO> = await database.getBaseWordPairs(req.body.user);
            res.status(200).send(buildResponseBody(baseWordPairDTOs));
        }
        catch (error) {
            const { name, message } = DestructureError(error);
            res.status(500).send(buildResponseBody(null, name, message));
        };
    });
    
    router.get("/get-word/:wordId", async (req: Request, res: Response): Promise<void> => {
        try {
            const wordId = parseInt(req.params.wordId, 10);
            const word: ExtendedWordDTO = await database.getWord(wordId, req.body.user);
            res.status(200).send(buildResponseBody(word));
        } 
        catch (error) {
            const { name, message } = DestructureError(error);
            res.status(500).send(buildResponseBody(null, name, message))
        };
    });
    
    router.put("/update-difficulties", async (req: Request, res: Response): Promise<void> => {
        try {
            await database.updateDifficulties(req.body.difficulties, req.body.user);
            res.status(200).send(buildResponseBody(null));
        } catch (error) {
            const { name, message } = DestructureError(error);
            res.status(500).send(buildResponseBody(null, name, message))
        };
    });
    
    router.put("/update-group", async (req: Request, res: Response): Promise<void> => {
        try {
            await database.updateGroup(req.body.group, req.body.user);
            res.status(200).send(buildResponseBody(null));
        }
        catch (error) {
            const { name, message } = DestructureError(error);
            res.status(500).send(buildResponseBody(null, name, message))
        };
    });

    app.use(router);
};