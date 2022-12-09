import * as mongoose from 'mongoose'

//設定mongodb資料格式
const InformationSchema = new mongoose.Schema({
  medicalNumber: {
    type: String,
    trim: true,
  },
  name: {
    type: String,
    required: [true, "must provide name"],
    trim: true,
  },
  species: {
    type: String,
    required: [true, "must provide species"],
    trim: true,
  },
  breed: {
    type: String,
    trim: true,
    default: "unknown",
  },
  owner: {
    type: String,
    required: [true, "must provide name"],
    trim: true,
  },
  phone: {
    type: String,
    required: [true, "must provide phone"],
    trim: true,
  },
  chip: {
    type: String,
    required: [true, "must provide chip number"],
    trim: true,
  },
  birthday: {
    type: String,
    trim: true,
    default: "unknown",
  },
  gender: {
    type: String,
    required: [true, "must provide gender"],
    trim: true,
  },
  bloodType: {
    type: String,
    required: [true, "must provide blood type "],
    trim: true,
  },
  ligation: {
    type: Boolean,
    required: [false, "must provide info"],
  },
  allergy: {
    type: String,
    trim: true,
    default: "None",
  },
  majorDiseases: {
    type: String,
    trim: true,
    default: "None",
  },
  remark: {
    type: String,
    trim: true,
    default: "None",
  },
  created_at: {},
});

module.exports = mongoose.model("Information", InformationSchema);
