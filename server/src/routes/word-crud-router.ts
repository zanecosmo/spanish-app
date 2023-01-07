import { Express, Router, Request, Response } from "express";
import { Database } from "../types";
import { verifyAdminRole } from "../middleware/verify-admin-role";

export const enableCRUDRoutes = (app: Express, database: Database): void => {
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
    
    router.get("/test-get-word", async (req: Request, res: Response): Promise<void> => {
        // req should have the type of word in the 
        console.log(req.body);
        res.send({ butt: "GET" });
    });
    
    router.get("/test-get-all", async (req: Request, res: Response): Promise<void> => {
        console.log(req.body);
        // 
        res.send({ butt: "GET ALL" });
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
            res.status(204);
        }
        catch (error) {
            res.status(500).send({ error: error });
        };
    });

    app.use(router);
};

