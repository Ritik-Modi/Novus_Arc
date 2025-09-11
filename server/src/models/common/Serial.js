import mongoose from "mongoose"
import { withBase } from "@/models/common/Base.js"

const { Schema , model } = mongoose

const serialSchema = withBase(new Schema({
    entity : {type : String , enums : ['CAMPUS','COMPANY','STUDENT','JOB','APPLICATION'], required : true},
    prefix : { type : String , required : true },
    nextSeq : { type : Number , required : true , default : 1 , min : 1},

}));

serialSchema.index({ entity : 1 , tenantId : 1} , { unique : true})

const Serial = model("Serial" , serialSchema);

export { Serial }