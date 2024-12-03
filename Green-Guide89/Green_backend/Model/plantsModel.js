const mongoose = require("mongoose");
const { Schema } = mongoose;

const PlantSchema = new Schema(
  {
    generalInfo: {
      plantName: {
        type: String,
        
        maxlength: 15000,
      },
      taxonomicName: {
        type: String,
        maxlength: 1500,
      },
      description: {
        type: String,
        maxlength: 10000,
      },
      category: {
        type: String,
        enum: [
          "Alliums",
          "Cole crops",
          "Flowers",
          "Fruit",
          "Greens",
          "Herbs",
          "Root",
          
        ],
        
      },
      icon: String,
      img: String,
    },
    quickInfo: {
      slideBarOption: {
        type: String,
        enum: [
          "16/square",
          "9/square",
          "8/square",
          "4/square",
          "2/square",
          "1/square",
          "2square",
          "4square",
          "3*3",
          "4*4",
          "5*5",
          "8*8",
          "10*10",
        ],
        
      },
      plantingDepth: {
        type: String,
        maxlength: 500,
        
      },
      waterPerWeek: {
        type: String,
        maxlength: 500,
        
      },
      sunRequirement: {
        type: String,
        enum: [
          "Full sun",
          "Part sun to full sun",
          "Part sun",
          "Shade to part sun",
          "Shade",
        ],
        
      },
      growingSeason: {
        type: String,
        enum: ["Cool", "Warm", "Perennial"],
        
      },
      frostTolerance: {
        type: String,
        enum: ["Not", "Semi", "Tolerant"],
       
      },
      germinationTime: {
        duration: { type: Number, min: 0, required: true },
        unit: { type: String, enum: ["days", "weeks", "months", "years"], required: true },
      },
      maxHeight: {
        height: { type: Number, min: 0,  },
        unit: { type: String, enum: ["in", "ft"],  },
      },
      maturityTime: {
        duration: { type: Number, min: 0,  },
        unit: { type: String, enum: ["days", "weeks", "months", "years"],  },
      },
      soilPH: {
        type: String,
        maxlength: 2000,
        
      },
      transplantingNotes: String,
      springFrost: Date,
      fallFrost: Date,
    },
    plantingTimes: {
      springHarvest: Date,
      fallHarvest: Date,
      springStartIndoors: Date,
      springTransplant: Date,
      springSowOutdoors: Date,
      fallStartIndoors: Date,
      fallTransplant: Date,
      fallSowOutdoors: Date,
    },
    detailedInfo: {
      growingFromSeed: {
        type: String,
        maxlength: 10000,
        
      },
      plantingConsiderations: {
        type: String,
        maxlength: 10000,
       
      },
      feeding: {
        type: String,
        maxlength: 10000,
        
      },
      harvesting: {
        type: String,
        maxlength: 10000,
        
      },
      storage: {
        type: String,
        maxlength: 10000,
       
      },
      pruning: {
        type: String,
        maxlength: 10000,
        
      },
      herbal: {
        type: String,
        maxlength: 10000,
        
      },
    },
  },
  //{ timestamps: true }
);

module.exports = mongoose.model("Plant", PlantSchema);