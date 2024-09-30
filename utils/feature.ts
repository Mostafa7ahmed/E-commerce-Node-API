import { match } from "assert";
import { PaginationQuery, QueryString, SearchQuery } from "../interfaces/feature";
import { Query } from "mongoose";


class Features{

    public paginationResult: PaginationQuery | undefined;
    constructor(public mongooseQuery:Query<any[], any>, private queryString: QueryString){
    }
    // filter(){
    //     const queryStringObj = {...this.queryString}
    //     const executedFields: string[] = ['page', 'limit', 'sort', 'fields', 'search'];
    //     executedFields.forEach((fields:string):void => {
    //         delete queryStringObj[fields]
    //     });
    //     let queryStr: string = JSON.stringify(queryStringObj);
    //     queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match=>`$${match}`)
    //     this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryStr));
    //     return this;
    // }

    filter() {
        const queryStringObj = { ...this.queryString }
        const executedFields: string[] = ['page', 'limit', 'sort', 'fields', 'search'];
        executedFields.forEach((field: string): void => {
          delete queryStringObj[field]
        });
        let queryStr: string = JSON.stringify(queryStringObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
        this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryStr));
        return this;
      }




    sort(){
        if(this.queryString.sort){
            const sortBy: string = this.queryString.sort.split(',').join(' ');
            this.mongooseQuery = this.mongooseQuery.sort(sortBy);
        }else{
            this.mongooseQuery = this.mongooseQuery.sort('-createdAt')
        }
        return this;
    }
    limitFields(){
        if(this.queryString.fields){
            const fields = this.queryString.fields.split(',').join(' ');
            this.mongooseQuery = this.mongooseQuery.select(fields);
        }
        return this
    }
    search(ModelName:string){
        if(this.queryString.search){
            let query: SearchQuery = {};
            if(ModelName == 'product'){
                query.$or = [
                    { name: new RegExp(this.queryString.search, 'i')},
                    { description: new RegExp(this.queryString.search, 'i')},
                ]
            }else{
                query =  { name: new RegExp(this.queryString.search, 'i')}
            }
            this.mongooseQuery = this.mongooseQuery.find(query);
        }
        return this;
    }
    pagination(documentCount:number){
        const page:number = this.queryString.page || 1;
        const limit: number = this.queryString.limit || 5;
        const skip:number = (page - 1)*limit;
        const endIndex: number = page*limit;
        const pagination: PaginationQuery = {};
        pagination.currentPage = Number(page);
        pagination.limit = Number(limit);
        pagination.totalPage = Math.ceil(documentCount / limit);
        if(endIndex < documentCount){
            pagination.next = Number(page) + 1
        }
        if(skip > 0){
            pagination.prev = Number(page) - 1
        }
        this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
        this.paginationResult = pagination;
        return this;
    }
}


export default Features;