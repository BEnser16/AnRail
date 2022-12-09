import * as mongoose from 'mongoose'

//設定mongodb資料格式
const RecordSchema = new mongoose.Schema({
  medicalNumber: {
    type: String,
    required: [true, "must provide ID"],
    trim: true,
  },
  date: {
    type: Date,
    required: [true, "must provide date"],
    trim: true,
  },
  doctor: {
    type: String,
    required: [true, "must provide name"],
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
});

module.exports = mongoose.model("Record", RecordSchema);
