const mongoose = require("mongoose");
const Rent = require("../models/Rent");
const model = require("../models/Rent");

const rentController = () => {
  const insertOne = async (rent) => {
    try {
      console.log("New rent added", rent);
      const newRent = new Rent(rent);
      await newRent.save();

      return newRent;
    } catch (error) {
      console.log("Rent validation failed.");
    }
  };

  const findOne = async (id) => {
    try {
      const rent = await model.findById(id).exec();
      return rent;
    } catch (error) {
      console.log(`Rent with id: ${id} not found`);
    }
  };

  const findAll = async (sorting = null) => {
    try {
      const rents = await model
        .find({ deletedAt: null }, null, { ...sorting })
        .exec();
      return rents;
    } catch (error) {
      console.log("No rents found.");
    }
  };

  const findByUserId = async (userId) => {
    try {
      const rents = await model
        .find({ userId: mongoose.Types.ObjectId(userId) })
        .exec();
      return rents;
    } catch (error) {
      console.log("No rents found with this id.");
    }
  };

  const updateOne = async (id, rent) => {
    try {
      const value = new Rent(rent);
      const updateTime = new Date();
      const updatedRent = await model.updateOne(
        {
          _id: id,
        },
        {
          $set: {
            carId: value.carId,
            userId: value.userId,
            startTime: value.startTime,
            finishTime: value.finishTime,
            updatedAt: updateTime,
          },
        }
      );
      return updatedRent;
    } catch (error) {
      console.log(`Update error: Rent with id: ${id} not found`);
    }
  };

  const deleteOne = async (id) => {
    try {
      const deleteTime = new Date();
      const deletedRent = await model.updateOne(
        {
          _id: id,
        },
        {
          $set: {
            deletedAt: deleteTime,
          },
        }
      );
      return deletedRent;
    } catch (error) {
      console.log(`Delete error: Rent with id: ${id} not found`);
    }
  };

  return {
    insertOne,
    findOne,
    findAll,
    updateOne,
    deleteOne,
    findByUserId
  };
};

module.exports = rentController;
