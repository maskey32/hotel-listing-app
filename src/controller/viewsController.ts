import express from 'express'
import { ListingInstance } from '../model/listingModel';
import { UserInstance } from '../model/userModel';

export function registerView(req: express.Request, res: express.Response, next: express.NextFunction) {
    res.render('./routes/register');
}

export function loginView(req: express.Request, res: express.Response, next: express.NextFunction) {
    res.render('./routes/login');
}

export async function dashboardView(req: express.Request | any, res: express.Response, next: express.NextFunction) {
    try {
        //const id = req.params.id;
        const id = req['rawHeaders'][7]
        console.log('@viewsController 17:=', id)
        const record = await UserInstance.findOne({
            where: { id },
            include: [{// includes all listings gotten by the user
                model: ListingInstance,
                as: 'listings'
            }]
        })
        console.log('@viewsController_25:=', record)
        res.render('./routes/dashboard', { record })

    } catch (err) {
        console.log('@viewsController 28:=', req.user)
        res.status(500).json({
            message: 'failed to read single user',
            route: '/read/:id'
        })
    }
    // console.log('@viewsController 34 req.params:=', req['rawHeaders'][7]);
    // res.render('./routes/dashboard');
}

export function createView(req: express.Request, res: express.Response, next: express.NextFunction) {
    res.render('./routes/create');
}