import * as mongoose from 'mongoose'

//設定mongodb資料格式
const CaseSchema = new mongoose.Schema({
  medicalNumber: {
    type: String,
    required: [true, "must provide ID"],
    trim: true,
  },
  date: {
    type: Date,
    required: [true, "must provide Date"],
    trim: true,
  },
  type: {
    type: String,
    required: [true, "must provide type"],
    trim: true,
  },
  describe: {
    type: String,
    trim: true,
    default: "None",
  },
  complete: {
    type: Boolean,
    trim: true,
    default: false,
  },
});

module.exports = mongoose.model("Case", CaseSchema);
