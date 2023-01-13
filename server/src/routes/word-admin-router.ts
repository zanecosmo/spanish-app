import { Express, Router, Request, Response } from "express";
import { Database } from "../types";
import { verifyAdminRole } from "../middleware/verify-admin-role";

export const enableAdminRoutes = (app: Express, database: Database): void => {
    const router: Router = Router();

    router.use(verifyAdminRole);

    router.post("/add-word", async (req: Request, res: Response): Promise<void> => {
        try {
            const parentId = await database.insertWord(req.body);
            res.status(200).send({ parentId: parentId });
        }
        catch (error) {
            res.status(500).send({ error: error });
        };
    });
    
    router.put("/update-word", async (req: Request, res: Response): Promise<void> => {
        try {
            const parentWordId = await database.updateWord(req.body);
            res.status(200).send({ parentWordId: parentWordId });
        }
        catch (error) {
            res.status(500).send({ error: error });
        };
    });
    
    router.delete("/delete-word", async (req: Request, res: Response): Promise<void> => {
        try {
            await database.deleteWord(req.body);
            res.status(204).send({ success: true });
        }
        catch (error) {
            res.status(500).send({ error: error });
        };
    });

    app.use(router);
};

