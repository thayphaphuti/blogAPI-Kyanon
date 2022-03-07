import {Request,Response } from "express";
import apiMessage from "../constants/Message";
import connection from "../lib/mysql-connection";
import Category from "../Models/Category";


export default class CategoryController{
    public static async GetAllCategorys(req: Request, res: Response){
        try{     
            res.status(200).json((await Category.find())[0]) 
        }
        catch(err){
            console.log(err.message);
            res.status(404).json({error: err.message});
        }
    }
    public static async GetCategory(req: Request, res: Response){
        try{
            const {id} = req.params;
            const cate = await Category.findOnebyId(id)
            res.status(200).json(cate[0][0])          
        }
        catch(err){
            console.log(err.message);
            res.status(404).json({error: err.message});
        }
     
        
    }
    public static async CreateCategory(req: Request, res: Response){
        try{
            const {title,slug,content} = req.body;
            // 'INSERT INTO Category (authorId,title,slug,createdAt,content) Values(1,'Training','abc', '2022-2-4','s')'
            let sql = `INSERT INTO Category (title,slug,content) Values
            ('${title}',
            '${slug}',
            '${content}')`
            connection.query(sql,(err)=>{
                if(err) throw err
                else res.status(201).json(apiMessage.CREATE)
            })
        }
        catch(err){
            console.log(err.message);
            res.status(400).json({error: err.message});
        }
    }
    public static async UpdateCategory(req: Request, res: Response){
        try{
            const {id} = req.params;
            const {title,slug,content} = req.body
            let sql = `UPDATE Category SET 
            title = '${title}', 
            slug='${slug}',
            content = '${content}'
            Where id = ${id} `
            connection.query(sql,(err)=>{
                if(err) throw err
                else res.status(200).json(apiMessage.UPDATE)
            })
        }
        catch(err){
            console.log(err.message);
            res.status(400).json({error: err.message});
        }
    }
    public static async DeleteCategory(req: Request, res: Response){
        try{
            const {id} = req.params;
             Category.deleteById(id)
            res.status(200).json(apiMessage.DELETE);
        }
        catch(err){
            console.log(err.message);
            res.status(400).json({error: err.message});
        }
    }
}