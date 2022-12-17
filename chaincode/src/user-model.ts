/*
 * SPDX-License-Identifier: Apache-2.0
 */

//  帳戶的資料模型
export class UserModel {
    public docType?: string;
    public userID: string;
    public username: string;
    public email: string;
    public password:string;
    public role?:string;
    
}
