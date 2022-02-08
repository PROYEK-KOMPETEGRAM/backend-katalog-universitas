import StatusCodes from "http-status-codes";
import { Request, Response, Handler } from "express";

import UserDao from "@daos/User/UserDao.mock";
import { paramMissingError } from "@shared/constants";

const userDao = new UserDao();
const { BAD_REQUEST, CREATED, OK } = StatusCodes;

const res = [
    {
        id: 1,
        name: "Kamda Cibiru",
        nama_dekan: "Ardi",
        visi: "Menjadi lebih baik",
        prodi: [
            {
                name: "RPL",
                ukt: 5000000,
                dosen: [
                    {
                        nama: "Bu Dian",
                    },
                ],
            },
        ],
    },
];

/**
 * Get all users.
 *
 * @param req
 * @param res
 * @returns
 */

export async function getAllUsers(req: Request, res: Response): Promise<void> {
    const users = await userDao.getAll();
    res.status(OK).json({ users });
    return;
}

/**
 * Add one user.
 *
 * @param req
 * @param res
 * @returns
 */
export async function addOneUser(req: Request, res: Response) {
    const { user } = req.body;
    if (!user) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    await userDao.add(user);
    return res.status(CREATED).end();
}

/**
 * Update one user.
 *
 * @param req
 * @param res
 * @returns
 */
export async function updateOneUser(req: Request, res: Response) {
    const { user } = req.body;
    if (!user) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    user.id = Number(user.id);
    await userDao.update(user);
    return res.status(OK).end();
}

/**
 * Delete one user.
 *
 * @param req
 * @param res
 * @returns
 */
export async function deleteOneUser(req: Request, res: Response) {
    const { id } = req.params;
    await userDao.delete(Number(id));
    return res.status(OK).end();
}
