'use strict';

class modelInterface {
  constructor(model) {
    this.model = model;
  }

  // create
  async create(json) {
    try {
      let instance = await this.model.create(json);
      return instance;
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  // readOne
  async readOne(id) {
    try {
      let oneInstance = await this.model.findOne({ where: { id } });
      return oneInstance;
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  async readAccount(email) {
    try {
      let oneInstance = await this.model.findOne({ where: { email } });
      return oneInstance;
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  // readAll
  async readAll() {
    try {
      let allInstances = await this.model.findAll();
      return allInstances;

    } catch (err) {
      console.error(err);
      return err;
    }
  }
  // update
  async update(data, id) {
    try {
      await this.model.update(data, { where: { id } });
      let updatedInstance = await this.model.findOne({ where: { id } });
      return updatedInstance;
    } catch (err) {
      console.error(err);
      return err;

    }
  }

  async readWithRelations(id, options) {
    try {
      let query = {where: { id }, ...options };
      let result = await this.model.findOne(query);
      return result;
    } catch(err){
      console.error(err);
      return err;
    }
  }


// delete
  async delete(id){
    try{
      let deletedInstance = await this.model.findOne({where: { id }});
      await this.model.destroy({where: { id }});
      return deletedInstance;
    } catch (err) {
      console.error(err);
      return err;
    }
  }
}

module.exports = modelInterface;