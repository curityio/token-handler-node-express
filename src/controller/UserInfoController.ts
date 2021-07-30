/*
 *  Copyright 2021 Curity AB
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import * as express from 'express'
import {getIDCookieName, getUserInfo} from '../lib'
import {config} from '../config'
import {InvalidBFFCookieException} from '../lib/exceptions'
import {asyncCatch} from '../supportability/exceptionMiddleware';

class UserInfoController {
    public router = express.Router()

    constructor() {
        this.router.get('/', asyncCatch(this.getUserInfo))
    }

    getUserInfo = (req: express.Request, res: express.Response, next: express.NextFunction) => {

        const idTokenCookieName = getIDCookieName(config.cookieNamePrefix)
        if (req.cookies && req.cookies[idTokenCookieName]) {

            const userData = getUserInfo(config.encKey, req.cookies[idTokenCookieName])
            res.status(200).json(userData)

        } else {
            throw new InvalidBFFCookieException()
        }
    }
}

export default UserInfoController
